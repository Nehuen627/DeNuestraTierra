import { Router } from 'express';
import nosotrosController from '../controller/nosotrosController.js';
import upload from '../middleware/uploadMiddleware.js';
import { authenticateLevel } from '../utils/utils.js';
const router = Router();

router.get("/nosotros/text", nosotrosController.getText)
router.get("/nosotros/pictures", nosotrosController.getPictures)
router.patch("/nosotros/text", authenticateLevel(4),nosotrosController.updateText)
router.delete("/nosotros/images/:iid",authenticateLevel(4), nosotrosController.deleteImageById)
router.post("/nosotros/images",authenticateLevel(4) ,upload.single('image'), nosotrosController.addImage)

export default router;