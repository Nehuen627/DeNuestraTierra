import { Router } from 'express';
import uploaderController from '../controller/uploaderController.js'
const router = Router();



router.post("/uploader/text", uploaderController.uploadText)
router.post("/uploader/pictures", uploaderController.uploadPicture)

export default router;