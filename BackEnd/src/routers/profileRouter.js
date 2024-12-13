import { Router } from 'express';
import userController from '../controller/userController.js';
import passport from 'passport';

const router = Router();

router.get('/profile', passport.authenticate('currentProfile', { session: false }), async (req, res) => {
    try {
        const user = req.user; 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = user.imgurl || new URL('/images/default.svg', baseUrl).href;
        
        const profile = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            avatarUrl: imageUrl,
            role: user.role,
            province: user.province,
            birthDate: user.birthDate,
            lastConnection: user.lastConnection,
            informativeEmails: user.informativeEmails
        };
        
        res.json(profile);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching profile", 
            error: error.message 
        });
    }
});

export default router;