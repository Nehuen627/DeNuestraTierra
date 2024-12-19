import {init} from '../db/db.js';  
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

export default class {
    static async getTalleres() {
        let sql = `SELECT * FROM talleres`;
        const [rows] = await init.execute(sql);
    
        const talleres = rows.map((taller) => ({
            ...taller,
            skills: JSON.parse(taller.skills), 
        }));

        return talleres; 
    }
    static async getTallerById(id) {
        const sql = 'SELECT * FROM talleres WHERE id = ?';
        const [rows] = await init.execute(sql, [id]);

        if (rows.length > 0) {
            const taller = rows[0];
            taller.skills = JSON.parse(taller.skills);
            return taller;
        }

        return null;
    }
    static async createTaller(tallerData) {
        const id = uuidv4(); 
        const { title, description, price, skills, link, imgUrl = null } = tallerData; 
        
        const fullImgUrl = imgUrl ? `http://localhost:8080${imgUrl}` : null;
        
        const sql = `INSERT INTO talleres (id, title, description, price, skills, link, imgurl) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [id, title, description, price, skills, link, fullImgUrl];
        
        await init.execute(sql, values);
        
        return { 
            id, 
            title, 
            description, 
            price, 
            skills,
            link, 
            imgUrl: fullImgUrl 
        };
    }
    static async deleteTaller(id) {
        try {
            // First get the image URL from database
            const [rows] = await init.query('SELECT imgurl FROM talleres WHERE id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Taller not found');
            }

            // Extract filename from full URL if exists
            const imgUrl = rows[0].imgurl;
            if (imgUrl) {
                const filename = imgUrl.split('/').pop();
                
                // Delete from database first
                const sql = `DELETE FROM talleres WHERE id = ?`;
                await init.execute(sql, [id]);

                // Try to delete file from uploads folder
                try {
                    const uploadsPath = path.join(process.cwd(), 'public', 'uploads', filename);
                    await fs.unlink(uploadsPath);
                } catch (fileError) {
                    console.warn(`File ${filename} could not be deleted: ${fileError.message}`);
                    // Don't throw error, continue with success response
                }
            } else {
                // If no image, just delete from database
                const sql = `DELETE FROM talleres WHERE id = ?`;
                await init.execute(sql, [id]);
            }

            return { success: true };
        } catch (error) {
            throw new Error(`Error deleting taller: ${error.message}`);
        }
    }

    static async updateTallerById(id, updates) {
        try {
            if (updates.imgUrl) {
                updates.imgUrl = `http://localhost:8080${updates.imgUrl}`;
            }

            if (updates.skills) {
                if (typeof updates.skills === 'string') {
                    updates.skills = updates.skills.split(',').map(skill => skill.trim());
                }
            }

            let sql = 'UPDATE talleres SET ';
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
        } catch (error) {
            throw new Error(`Error updating taller: ${error.message}`);
        }
    }
}