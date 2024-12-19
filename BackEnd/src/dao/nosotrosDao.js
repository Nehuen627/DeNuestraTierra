import { v4 as uuidv4 } from 'uuid';
import {init} from '../db/db.js';  
import fs from 'fs/promises';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class NosotrosDao {
    static async getText() {
        try {
            const [rows] = await init.query('SELECT content FROM nosotros WHERE id = 1'); 
            return rows.length ? rows[0].content : null;
        } catch (error) {
            throw new Error(`Error in DAO: ${error.message}`);
        }
    }

    static async getPictures() {
        try {
            const [rows] = await init.query('SELECT * FROM pictures'); 
            return rows;
        } catch (error) {
            throw new Error(`Error in DAO: ${error.message}`);
        }
    }
    static async updateText(newText, id = 1) {
        try {
            const updateQuery = 'UPDATE nosotros SET content = ? WHERE id = ?';
            const [result] = await init.execute(updateQuery, [newText, id]);
            return result
        } catch (error) {
            throw new Error(`Error in DAO: ${error.message}`);
        }
    }
    static async deleteImageById(id) {
        try {
            // First get the image URL from database
            const [rows] = await init.query('SELECT url FROM pictures WHERE id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Image not found');
            }

            // Extract filename from full URL
            const url = rows[0].url;
            const filename = url.split('/').pop();
            
            // Delete from database first
            const sql = `DELETE FROM pictures WHERE id = ?`;
            await init.execute(sql, [id]);

            // Try to delete file from uploads folder, but don't fail if file is not found
            try {
                const uploadsPath = path.join(process.cwd(), 'public', 'uploads', filename);
                await fs.unlink(uploadsPath);
            } catch (fileError) {
                console.warn(`File ${filename} could not be deleted: ${fileError.message}`);
                // Don't throw error, continue with success response
            }

            return { success: true };
        } catch (error) {
            throw new Error(`Error in DAO: ${error.message}`);
        }
    }

    static async addImage(imageUrl, alt = 'Nosotros Image') {
        try {
            const id = uuidv4();
            const fullUrl = `http://localhost:8080${imageUrl}`;
            const sql = 'INSERT INTO pictures (id, url, alt) VALUES (?, ?, ?)';
            const [result] = await init.execute(sql, [id, fullUrl, alt]);
            return { id, url: fullUrl, alt };
        } catch (error) {
            throw new Error(`Error in DAO: ${error.message}`);
        }
    }
}
