import uploaderService from "../services/uploaderService.js";
export default class {
    static async uploadText(req, res) {
        const { text } = req.body;
        try {
            const insertId = await uploaderService.uploadText(text);
            res.status(201).json({ message: 'Text inserted successfully', insertId });
        } catch (error) {
            console.error('Error inserting text:', error);
            res.status(500).json({ error: 'Failed to insert text' });
        }
    }
    static async uploadPicture(req, res) {
        const { url, alt } = req.body;
        try {
            const insertId = await uploaderService.uploadPicture(url, alt);
            res.status(201).json({ message: 'Picture inserted successfully', insertId });
        } catch (error) {
            console.error('Error inserting picture:', error);
            res.status(500).json({ error: 'Failed to insert picture' });
        }
    }}