import { Router } from 'express';
import talleresController from '../controller/talleresController.js';

const router = Router();


//route to send cursos info 
router.get("/talleres", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = new URL('/images/images.png', baseUrl).href;

    const talleres = [
        { Id: 1, Title: "Estrategias", Description: "Curso sobre estatregias para ....", Price: 100454, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 2, Title: "Consistencia", Description: "Curso sobre consistencia ....", Price: 103440, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 3, Title: "Exploración de aromas", Description: "Curso sobre los aromas......", Price: 14300, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 4, Title: "Estrategias", Description: "Curso sobre estatregias para ....", Price: 100454, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 5, Title: "Consistencia", Description: "Curso sobre consistencia ....", Price: 103440, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 6, Title: "Exploración de aromas", Description: "Curso sobre los aromas......", Price: 14300, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        
    ];
    res.json(talleres);
})

router.get('/talleres/:id', (req, res) => {
    const tallerId = parseInt(req.params.id);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = new URL('/images/images.png', baseUrl).href;

    const talleres = [
        { Id: 1, Title: "Estrategias", Description: "Curso sobre estatregias para ....", Price: 100454, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 2, Title: "Consistencia", Description: "Curso sobre consistencia ....", Price: 103440, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 3, Title: "Exploración de aromas", Description: "Curso sobre los aromas......", Price: 14300, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 4, Title: "Estrategias", Description: "Curso sobre estatregias para ....", Price: 100454, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 5, Title: "Consistencia", Description: "Curso sobre consistencia ....", Price: 103440, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        { Id: 6, Title: "Exploración de aromas", Description: "Curso sobre los aromas......", Price: 14300, ImgUrl: imageUrl, Skills: ["Wine flavor identification","Understanding wine regions","Proper tasting techniques","Food and wine pairing"]},
        
    ];
    const taller = talleres.find(t => t.Id === tallerId);

    if (taller) {
        res.json(taller);
    } else {
        res.status(404).json({ message: "Taller not found" });
    }
});



router.get('/demo/talleres', talleresController.getTalleres)
router.get('/demo/talleres/:id', talleresController.getTallerById)
router.post('/demo/talleres', talleresController.createTaller)
router.delete('/demo/talleres/:id', talleresController.deleteTaller)
router.patch('/demo/talleres/:id', talleresController.updateTallerById)

export default router;