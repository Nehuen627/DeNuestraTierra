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

        const [[cart], [items]] = await Promise.all([
            init.execute(cartSql, [cid]),
            init.execute(itemsSql, [cid])
        ]);

        if (!cart) return null;

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
    
        const [[cart]] = await init.execute(cartSql, [uid]);
    
        if (!cart) return null;
    
        const [items] = await init.execute(itemsSql, [cart.id]);
    
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
            }))
        };
    }
    

    static async findOneAndUpdate(criteria) {
        const { _id: cartId, products } = criteria;
        try {
            const connection = await init.getConnection();
            
            try {
                await connection.beginTransaction();

                for (const product of products) {
                    const productId = product.productId._id || product.productId;
                    
                    const [[existingItem]] = await connection.execute(
                        'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
                        [cartId, productId]
                    );

                    if (existingItem) {
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

                const [[priceResults]] = await connection.execute(`
                    SELECT SUM(p.price * ci.quantity) as total_price
                    FROM cart_items ci
                    JOIN products p ON ci.product_id = p.id
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
    static async deleteCartItem(cid, pid) {
        const connection = await init.getConnection(); 
        try {
            await connection.beginTransaction();
    
            const deleteQuery = 'DELETE FROM cart_items WHERE product_id = ? AND cart_id = ?';
            await connection.execute(deleteQuery, [pid, cid]);
    
            const [priceResults] = await connection.execute(`
                SELECT SUM(p.price * ci.quantity) as total_price
                FROM cart_items ci
                JOIN products p ON ci.product_id = p.id
                WHERE ci.cart_id = ?
            `, [cid]);
    
            
            const totalPrice = priceResults[0]?.total_price || 0;
                
            const updateQuery = 'UPDATE carts SET total_price = ? WHERE id = ?';
            const [updateResult] = await connection.execute(updateQuery, [totalPrice, cid]);
            await connection.commit();
    
            return this.findById(cid); 
        } catch (error) {
            await connection.rollback();
            throw new Error(`Error deleting product from cart: ${error.message}`);
        } finally {
            connection.release();
        }
    }
    
}