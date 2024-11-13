import init from '../db/db.js';  

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
            const [rows] = await init.query('SELECT url, alt FROM pictures'); 
            return rows;
        } catch (error) {
            throw new Error(`Error in DAO: ${error.message}`);
        }
    }
}
