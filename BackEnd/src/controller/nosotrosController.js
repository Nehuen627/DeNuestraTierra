import nosotrosService from '../services/nosotrosService.js';

export default class NosotrosController {
    static async getText(req, res) {
        try {
            const text = await nosotrosService.getText();
            res.json({ text });
        } catch (error) {
            console.error('Error fetching text:', error);
            res.status(500).json({ error: 'Failed to fetch text' });
        }
    }

    static async getPictures(req, res) {
        try {
            const pictures = await nosotrosService.getPictures();
            res.json({ pictures });
        } catch (error) {
            console.error('Error fetching pictures:', error);
            res.status(500).json({ error: 'Failed to fetch pictures' });
        }
    }
}
