import { Router } from 'express';

const router = Router();


// Route to get profile data
router.get('/profile', (req, res) => {

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = new URL('/images/default.svg', baseUrl).href;
    /* fake info */
    const profile = {

        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        avatarUrl: imageUrl,
        role: "Usuario"
    };

    res.json(profile);
});

export default router;