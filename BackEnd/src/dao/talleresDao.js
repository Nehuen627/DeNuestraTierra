import init from '../db/db.js';  
import { v4 as uuidv4 } from 'uuid';

export default class {
    static async getTalleres({limit = 4, offset = 0 }) {
        let sql = `SELECT * FROM talleres WHERE 1 = 1`;
        let countSql = `SELECT COUNT(*) as total FROM talleres WHERE 1 = 1`;
        const values = [];

    
        sql += ` LIMIT ${limit} OFFSET ${offset}`;
    
        const [countResult] = await init.execute(countSql, values);
        const totalTalleres = countResult[0].total;
    
        const [rows] = await init.execute(sql, values);
    
        const totalPages = Math.ceil(totalTalleres / limit);
    
        return { talleres: rows, totalPages };
    }
    static async getTallerById(id) {
        const sql = 'SELECT * FROM talleres WHERE id = ?';
        const [rows] = await init.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    static async createTaller(tallerData) {
        const id = uuidv4(); 
        const { title, description, price, skills} = tallerData; 
        
        const sql = `INSERT INTO talleres (id, title, description, price, skills) VALUES (?, ?, ?, ?, ?)`;
        const values = [id, title, description, price, skills];
        
        const [result] = await init.execute(sql, values);
        
        return { id, title, description, price, skills };
    }
    static async deleteTaller(id) {
        const sql = `DELETE FROM talleres WHERE id = ?`;
        await init.execute(sql, [id]);

        const [rows] = await init.execute('SELECT * FROM products WHERE id = ?', [id])
        return 
    }
    static async updateTallerById(id, updates) {
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
    }
}