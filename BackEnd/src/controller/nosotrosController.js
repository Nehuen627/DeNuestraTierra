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
    static async updateText (req, res) {
        try {
            const text = req.body.text
            const result = await nosotrosService.updateText(text);
            res.json({ result});
        } catch (error) {
            console.error('Error fetching pictures:', error);
            res.status(500).json({ error: 'Failed to fetch pictures' });
        }
    }
    static async deleteImageById (req, res) {
        try {
            const id = req.params.iid
            const result = await nosotrosService.deleteImageById(id);
            res.json({ result});
        } catch (error) {
            console.error('Error fetching pictures:', error);
            res.status(500).json({ error: 'Failed to fetch pictures' });
        }
    }
    static async addImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No image file provided' });
            }

            const imageUrl = `/uploads/${req.file.filename}`;
            const result = await nosotrosService.addImage(imageUrl);
            res.status(201).json({ message: 'Image uploaded successfully', result });
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        }
    }
}
