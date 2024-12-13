import { init } from '../db/db.js';
import { v4 as uuidv4 } from 'uuid';
import { Exception } from '../utils/utils.js';

export default class {
    static async create(userId) {
        const cartId = uuidv4();
        const sql = 'INSERT INTO carts (id, user_id) VALUES (?, ?)';
        await init.execute(sql, [cartId, userId]);
        return this.findById(cartId);
    }

    static async findById(cid) {
        const cartSql = 'SELECT * FROM carts WHERE id = ?';
        const itemsSql = `
            SELECT ci.*, p.title, p.price, p.imgUrl 
            FROM cart_items ci 
            JOIN products p ON ci.product_id = p.id 
            WHERE ci.cart_id = ?`;
        const talleresSql = `
            SELECT ci.*, t.title, t.price 
            FROM cart_items ci 
            JOIN talleres t ON ci.taller_id = t.id 
            WHERE ci.cart_id = ?`;

        const [[cart]] = await init.execute(cartSql, [cid]);

        if (!cart) return null;

        const [items] = await init.execute(itemsSql, [cart.id]);
        const [talleres] = await init.execute(talleresSql, [cart.id]);

        return {
            ...cart,
            products: items.map(item => ({
                productId: {
                    _id: item.product_id,
                    title: item.title,
                    price: item.price,
                    imgUrl: item.imgUrl
                },
                quantity: item.quantity
            })),
            talleres: talleres.map(item => ({
                tallerId: {
                    _id: item.taller_id,
                    title: item.title,
                    price: item.price
                }
            }))
        };
    }
    

    static async findByUserId(uid) {
        const cartSql = 'SELECT * FROM carts WHERE user_id = ?';
        const itemsSql = `
            SELECT ci.*, p.title, p.price, p.imgUrl 
            FROM cart_items ci 
            JOIN products p ON ci.product_id = p.id 
            WHERE ci.cart_id = ?`;
        const talleresSql = `
            SELECT ci.*, t.title, t.price 
            FROM cart_items ci 
            JOIN talleres t ON ci.taller_id = t.id 
            WHERE ci.cart_id = ?`;

        const [[cart]] = await init.execute(cartSql, [uid]);

        if (!cart) return null;

        const [items] = await init.execute(itemsSql, [cart.id]);
        const [talleres] = await init.execute(talleresSql, [cart.id]);

        return {
            ...cart,
            products: items.map(item => ({
                productId: {
                    _id: item.product_id,
                    title: item.title,
                    price: item.price,
                    imgUrl: item.imgUrl
                },
                quantity: item.quantity
            })),
            talleres: talleres.map(item => ({
                tallerId: {
                    _id: item.taller_id,
                    title: item.title,
                    price: item.price
                }
            }))
        };
    }
    

    static async findOneAndUpdate(criteria) {
        const { _id: cartId, products = [], talleres = [] } = criteria;
        try {
            const connection = await init.getConnection();
    
            try {
                await connection.beginTransaction();
    
                for (const product of products) {
                    const productId = product.productId._id || product.productId;
    
                    const [[existingProduct]] = await connection.execute(
                        'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
                        [cartId, productId]
                    );
    
                    if (existingProduct) {
                        await connection.execute(
                            'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
                            [product.quantity, cartId, productId]
                        );
                    } else {
                        await connection.execute(
                            'INSERT INTO cart_items (id, cart_id, product_id, quantity) VALUES (?, ?, ?, ?)',
                            [uuidv4(), cartId, productId, product.quantity]
                        );
                    }
                }
    
                for (const taller of talleres) {
                    const tallerId = taller.tallerId._id || taller.tallerId;
    
                    const [[existingTaller]] = await connection.execute(
                        'SELECT * FROM cart_items WHERE cart_id = ? AND taller_id = ?',
                        [cartId, tallerId]
                    );
    
                    if (!existingTaller) {
                        await connection.execute(
                            'INSERT INTO cart_items (id, cart_id, taller_id) VALUES (?, ?, ?)',
                            [uuidv4(), cartId, tallerId]
                        );
                    }
                }
    
                const [[priceResults]] = await connection.execute(`
                    SELECT 
                        COALESCE(SUM(p.price * ci.quantity), 0) +
                        COALESCE(SUM(t.price), 0) as total_price
                    FROM cart_items ci
                    LEFT JOIN products p ON ci.product_id = p.id
                    LEFT JOIN talleres t ON ci.taller_id = t.id
                    WHERE ci.cart_id = ?
                `, [cartId]);
    
                const totalPrice = priceResults?.total_price || 0;
    
                await connection.execute(
                    'UPDATE carts SET total_price = ? WHERE id = ?',
                    [totalPrice, cartId]
                );
    
                await connection.commit();
                connection.release();
    
                return this.findById(cartId);
            } catch (error) {
                await connection.rollback();
                connection.release();
                throw error;
            }
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }
    

    static async find() {
        const sql = 'SELECT * FROM carts';
        const [carts] = await init.execute(sql);
        return Promise.all(carts.map(cart => this.findById(cart.id)));
    }

    static async remove(cid) {
        await init.execute('DELETE FROM cart_items WHERE cart_id = ?', [cid]);
        await init.execute('DELETE FROM carts WHERE id = ?', [cid]);
        return true;
    }
    static async deleteCartItem(cid, pid = null, tid = null) {
        const connection = await init.getConnection(); 
        try {
            await connection.beginTransaction();
    
            if (pid) {
                const deleteProductQuery = 'DELETE FROM cart_items WHERE product_id = ? AND cart_id = ?';
                await connection.execute(deleteProductQuery, [pid, cid]);
            }
            
            if (tid) {
                const deleteTallerQuery = 'DELETE FROM cart_items WHERE taller_id = ? AND cart_id = ?';
                await connection.execute(deleteTallerQuery, [tid, cid]);
            }
    
            const [[priceResults]] = await connection.execute(`
                SELECT 
                    COALESCE(SUM(p.price * ci.quantity), 0) +
                    COALESCE(SUM(t.price), 0) as total_price
                FROM cart_items ci
                LEFT JOIN products p ON ci.product_id = p.id
                LEFT JOIN talleres t ON ci.taller_id = t.id
                WHERE ci.cart_id = ?
            `, [cid]);
            
            const totalPrice = priceResults?.total_price || 0;
    
            const updateQuery = 'UPDATE carts SET total_price = ? WHERE id = ?';
            await connection.execute(updateQuery, [totalPrice, cid]);
    
            await connection.commit();
    
            return this.findById(cid); 
        } catch (error) {
            await connection.rollback();
            throw new Error(`Error deleting item from cart: ${error.message}`);
        } finally {
            connection.release();
        }
    }
    
    
}