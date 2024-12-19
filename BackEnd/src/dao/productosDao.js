import {init} from '../db/db.js';  
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

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
        try {
            // If there's a new image, update the URL
            if (updates.imgUrl) {
                updates.imgUrl = `http://localhost:8080${updates.imgUrl}`;
            }

            let sql = 'UPDATE products SET ';
            const fields = [];
            const values = [];
        
            for (const [key, value] of Object.entries(updates)) {
                if (value !== undefined && value !== null) {  // Only update non-null values
                    fields.push(`${key} = ?`);
                    values.push(value);
                }
            }
        
            if (fields.length === 0) return null;  // No valid updates

            sql += fields.join(', ');
            sql += ' WHERE id = ?';
            values.push(id);
        
            const [result] = await init.execute(sql, values);
            return result;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    static async deleteProduct(id) {
        try {
            // First get the image URL from database
            const [rows] = await init.query('SELECT imgUrl FROM products WHERE id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Product not found');
            }

            // Extract filename from full URL if exists
            const imgUrl = rows[0].imgUrl;
            if (imgUrl) {
                const filename = imgUrl.split('/').pop();
                
                // Delete from database first
                const sql = `DELETE FROM products WHERE id = ?`;
                await init.execute(sql, [id]);

                // Try to delete file from uploads folder
                try {
                    const uploadsPath = path.join(process.cwd(), 'public', 'uploads', filename);
                    await fs.unlink(uploadsPath);
                } catch (fileError) {
                    console.warn(`File ${filename} could not be deleted: ${fileError.message}`);
                }
            } else {
                // If no image, just delete from database
                const sql = `DELETE FROM products WHERE id = ?`;
                await init.execute(sql, [id]);
            }

            return { success: true };
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    static async insertProduct({ title, price, imgUrl, rating, type, description, stock, barCode, status = 1, grapeType = null, region = null, harvestYear = null, pairing = null, alcoholContent = null }) {
        try {
            // Validate required fields
            if (!title || !price || !type || !description || !stock || !barCode) {
                throw new Error('Missing required fields');
            }

            const id = uuidv4();
            const fullImgUrl = imgUrl ? `http://localhost:8080${imgUrl}` : null;
            
            const sql = `
                INSERT INTO products (id, title, price, imgUrl, rating, type, description, stock, barCode, status, grapeType, region, harvestYear, pairing, alcoholContent)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                id, 
                title, 
                Number(price), 
                fullImgUrl, 
                Number(rating) || 0, 
                type,
                description,
                Number(stock),
                barCode,
                Number(status),
                grapeType || null,
                region || null,
                harvestYear || null,
                pairing || null,
                alcoholContent || null
            ];

            await init.execute(sql, values);
            
            return { 
                id, title, price, imgUrl: fullImgUrl, rating, type, description, stock, barCode, status, grapeType, region, harvestYear, pairing, alcoholContent 
            };
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }
    


    static async getProductosType(){
        let sql = `SELECT * FROM productosType `;
    
        const [rows] = await init.execute(sql);
    
        return rows;
    }
    static async createProductosType(prodocutosTypeData){
        const id = uuidv4(); 
        const { type } = prodocutosTypeData; 
        
        const sql = `INSERT INTO productosType (id, type) VALUES (?, ?)`;
        const values = [id, type];
        
        const [result] = await init.execute(sql, values);
        
        return { id, type };
    }
    static async deleteProductosType(id){
        const sql = `DELETE FROM productosType WHERE id = ?`;
        await init.execute(sql, [id]);

        const [rows] = await init.execute('SELECT * FROM productosType WHERE id = ?', [id])
        return 
    }
}