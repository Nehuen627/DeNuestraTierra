import{init} from '../db/db.js';  
import { v4 as uuidv4 } from 'uuid';


export default class {
    static async getUserById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await init.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    static async deleteUserById(id){
        const sql = 'DELETE FROM users WHERE id = ?'
        
        await init.execute(sql, [id])
        const [rows] = await init.execute('SELECT * FROM users WHERE id = ?', [id])
        return
    }
    static async getUserByEmail(email){
        const sql = 'SELECT * FROM users WHERE email = ?';
        
        const [rows] = await init.execute(sql, [email]);        
        return rows.length > 0 ? rows[0] : null;
    }
    static async create({name, lastName, email,  province, password, birthDate, informativeEmails, role = "user", imgUrl = " "}){                
        try {
            const id = uuidv4();
            const sql = `
                INSERT INTO users (id, name, lastName, email, birthDate, province, password, role, imgUrl, informativeEmails)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            await init.execute(sql, [id, name, lastName, email, birthDate, province, password, role, imgUrl, informativeEmails,]);
            
            return { id, name, lastName, email, birthDate, province, password, role, imgUrl };
        } 
        catch(error) {
            console.log(error);
            
        }
    }
    static async updateUserById(id, updates) {
        let sql = 'UPDATE users SET ';
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
    static async getUsers() {
        let sql = 'SELECT * FROM users'
        const [rows] = await init.execute(sql);
        return rows; 
    }
}