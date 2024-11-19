import talleresService from "../services/talleresService.js";
export default class {
    static async getTalleres(req, res) {
    
        try {
            const talleres = await talleresService.getTalleres()
            res.json(talleres);
        } catch (error) {
            console.error('Error fetching talleres:', error);
            res.status(500).json({ message: 'Error fetching talleres', error });
        }
    }
    static async getTallerById(req, res) {
        const { id } = req.params;
        try {
            const taller = await talleresService.getTallerById(id);
            if (!taller) {
                return res.status(404).json({ message: 'taller not found' });
            }
            res.json(taller);
        } catch (error) {
            console.error('Error fetching taller by ID:', error);
            res.status(500).json({ message: 'Error fetching taller', error });
        }
    }
    static async createTaller(req, res) {
        try {
            const tallerData = req.body; 
            const newTaller = await talleresService.createTaller(tallerData);
            res.status(201).json({ message: 'Taller created successfully', taller: newTaller });
        } catch (error) {
            res.status(500).json({ message: 'Error creating taller', error });
        }
    }
    static async deleteTaller(req, res) {
        try {
            const { id } = req.params;
            await talleresService.deleteTaller(id);
            res.status(200).json({ message: 'Taller deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting taller', error });
        }
    }
    static async updateTallerById(req, res) {
        const { id } = req.params;
        const updates = req.body;  
        try {
            const updatedTaller = await talleresService.updateTallerById(id, updates);
            res.json(updatedTaller);
        } catch (error) {
            console.log(error);
                        
            res.status(500).json({ message: 'Error updating product', error });
        }
    }
}