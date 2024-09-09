import { Router } from 'express';
const router = Router();


router.get("/nosotros/text", (req, res) => {
    
    const text = {
        text: `En el año 2018 comenzó una verdadera pasión por el vino con el nombre "De Nuestra Tierra", un espacio en el cual disfrutarás de grandes vinos Familiares de Terruños Argentinos.

Siempre acompañando a cada persona a disfrutar al máximo cada Copa, donde el viñedo se transmite de una forma única.

En "De Nuestra Tierra" nos especializamos en Degustaciones, Capacitaciones, Eventos, Tour de Vinos y mucho más. 

Nos importa que siempre que descorche un vino comience y termine con una sonrisa.

`
    };

    res.json(text);
})
router.get("/nosotros/pictures", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const pictures = [
        
    ];
    /* fake code to try pictures */
    for (let i = 1 ; i <= 13; i++) {
        const imageUrl = new URL(`/images/${i}.jpg`, baseUrl).href;
        pictures.push({url: imageUrl , alt: "vinos"})
    }
    

    res.json(pictures);
})
export default router;