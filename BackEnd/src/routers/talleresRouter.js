import { Router } from 'express';
import talleresController from '../controller/talleresController.js';

const router = Router();


router.get('/talleres', talleresController.getTalleres)
router.get('/talleres/:id', talleresController.getTallerById)
router.post('/talleres', talleresController.createTaller)
router.delete('/talleres/:id', talleresController.deleteTaller)
router.patch('/talleres/:id', talleresController.updateTallerById)

export default router;