import {init} from '../db/db.js';  
import { v4 as uuidv4 } from 'uuid';

export default class {
    static async getTalleres() {
        let sql = `SELECT * FROM talleres `;
    
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
        console.log("entro aca");
        
        const id = uuidv4(); 
        const { title, description, price, skills, link, imgUrl = " "} = tallerData; 
        
        const sql = `INSERT INTO talleres (id, title, description, price, skills, link, imgurl) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [id, title, description, price, skills, link, imgUrl];
        
        const [result] = await init.execute(sql, values);
        
        return { id, title, description, price, skills, link, imgUrl };
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