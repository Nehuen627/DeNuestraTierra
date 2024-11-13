import init from '../db/db.js';  
import { v4 as uuidv4 } from 'uuid';

export default class {
    static async getFilteredProductsFromDB({ query, rating, category, sortPrice, limit = 10, offset = 0 }) {
        let sql = `SELECT * FROM products WHERE 1 = 1`;
        let countSql = `SELECT COUNT(*) as total FROM products WHERE 1 = 1`;
        const values = [];
    
        if (query) {
            sql += ` AND (title LIKE ? OR barcode = ?)`;
            countSql += ` AND (title LIKE ? OR barcode = ?)`;
            values.push(`%${query}%`, query);
        }
    
        if (rating) {
            let ratingCondition = '';
            switch (rating) {
                case '5': ratingCondition = 'rating >= 4.5'; break;
                case '4': ratingCondition = 'rating >= 3.5 AND rating < 4.5'; break;
                case '3': ratingCondition = 'rating >= 2.5 AND rating < 3.5'; break;
                case '2': ratingCondition = 'rating >= 1.5 AND rating < 2.5'; break;
                case '1': ratingCondition = 'rating < 1.5'; break;
            }
            if (ratingCondition) {
                sql += ` AND ${ratingCondition}`;
                countSql += ` AND ${ratingCondition}`;
            }
        }
    
        if (category && category !== '') {
            sql += ` AND type = ?`;
            countSql += ` AND type = ?`;
            values.push(category);
        }
    
        if (sortPrice === 'lowToHigh') {
            sql += ` ORDER BY price ASC`;
        } else if (sortPrice === 'highToLow') {
            sql += ` ORDER BY price DESC`;
        }
    
        sql += ` LIMIT ${limit} OFFSET ${offset}`;
    
        const [countResult] = await init.execute(countSql, values);
        const totalProducts = countResult[0].total;
    
        const [rows] = await init.execute(sql, values);
    
        const totalPages = Math.ceil(totalProducts / limit);
    
        return { productos: rows, totalPages };
    }
    

    static async getProductById(id) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await init.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async updateProductById(id, updates) {
        let sql = 'UPDATE products SET ';
        const fields = [];
        const values = [];
    
        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
    
        sql += fields.join(', ');
        sql += ' WHERE id = ?';
        values.push(id);
    
        const [result] = await init.execute(sql, values);
        return result;
    }

    static async deleteProduct(id) {
        const sql = `DELETE FROM products WHERE id = ?`;
        await init.execute(sql, [id]);

        const [rows] = await init.execute('SELECT * FROM products WHERE id = ?', [id])
        return  
    }

    static async insertProduct({ title, price, imgUrl, rating, type, description, stock, barCode, status = 1 }) {
        const id = uuidv4();
        const sql = `
            INSERT INTO products (id, title, price, imgUrl, rating, type, description, stock, barCode, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await init.execute(sql, [id, title, price, imgUrl, rating, type, description, stock, barCode, status]);
        
        return { id, title, price, imgUrl, rating, type, description, stock, barCode, status };
    }

}