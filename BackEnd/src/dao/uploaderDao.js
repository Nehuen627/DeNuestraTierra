import init from "../db/db.js";

export default class {
    static async uploadText(text) {
        const result = await init.query('INSERT INTO nosotros (text) VALUES (?)', [text]);
        return result[0].insertId; 
    }
    static async uploadPicture(url, alt) {
        const result = await init.query('INSERT INTO pictures (url, alt) VALUES (?, ?)', [url, alt]);
        return result[0].insertId;
    }
}