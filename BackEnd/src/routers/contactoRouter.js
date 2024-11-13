import { Router } from 'express';
import mailController from '../controller/mailController.js';

const router = Router();

router.post('/sendEmail', mailController.sendEmail);

export default router;
