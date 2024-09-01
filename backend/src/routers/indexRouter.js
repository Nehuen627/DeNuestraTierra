import { Router } from 'express';
import profileRouter from "./profileRouter.js"

const router = Router();


router.use("/api", profileRouter)

export default router;