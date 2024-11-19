import { Router } from 'express';
import talleresController from '../controller/talleresController.js';

const router = Router();


router.get('/talleres', talleresController.getTalleres)
router.get('/talleres/:id', talleresController.getTallerById)
router.post('/demo/talleres', talleresController.createTaller)
router.delete('/demo/talleres/:id', talleresController.deleteTaller)
router.patch('/demo/talleres/:id', talleresController.updateTallerById)

export default router;