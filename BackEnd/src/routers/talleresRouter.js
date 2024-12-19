import { Router } from 'express';
import talleresController from '../controller/talleresController.js';
import upload from '../middleware/uploadMiddleware.js';
import { authenticateLevel } from '../utils/utils.js';

const router = Router();

router.get('/talleres', talleresController.getTalleres)
router.get('/talleres/:id', talleresController.getTallerById)
router.post('/talleres',authenticateLevel(4), upload.single('image'), talleresController.createTaller)
router.delete('/talleres/:id',authenticateLevel(4), talleresController.deleteTaller)
router.patch('/talleres/:id',authenticateLevel(4), upload.single('image'), talleresController.updateTallerById)

export default router;