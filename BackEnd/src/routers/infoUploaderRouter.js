import { Router } from 'express';
import uploaderController from '../controller/uploaderController.js'
import { authenticateLevel } from '../utils/utils.js';
const router = Router();



router.post("/uploader/text", authenticateLevel(4), uploaderController.uploadText)
router.post("/uploader/pictures", authenticateLevel(4),uploaderController.uploadPicture)

export default router;