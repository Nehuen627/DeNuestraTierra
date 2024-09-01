import { Router } from 'express';

const router = Router();


//route to send cursos info 
router.get("/cursos", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = new URL('/images/images.png', baseUrl).href;

    const cursos = [
        { Id: 1, Title: "Estrategias", Description: "Curso sobre estatregias para ....", Price: 100454, ImgUrl: imageUrl},
        { Id: 2, Title: "Consistencia", Description: "Curso sobre consistencia ....", Price: 103440, ImgUrl: imageUrl},
        { Id: 3, Title: "Exploración de aromas", Description: "Curso sobre los aromas......", Price: 14300, ImgUrl: imageUrl},
        { Id: 4, Title: "Estrategias", Description: "Curso sobre estatregias para ....", Price: 100454, ImgUrl: imageUrl},
        { Id: 5, Title: "Consistencia", Description: "Curso sobre consistencia ....", Price: 103440, ImgUrl: imageUrl},
        { Id: 6, Title: "Exploración de aromas", Description: "Curso sobre los aromas......", Price: 14300, ImgUrl: imageUrl},
        
    ];
    res.json(cursos);
})

export default router;