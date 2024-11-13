import { Router } from 'express';
import nosotrosController from '../controller/nosotrosController.js';
const router = Router();



router.get("/nosotros/text", nosotrosController.getText)
router.get("/nosotros/pictures", nosotrosController.getPictures)

export default router;