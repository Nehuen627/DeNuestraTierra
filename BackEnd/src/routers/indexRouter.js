import { Router } from 'express';
import profileRouter from "./profileRouter.js"
import cursosRouter from "./cursosRouter.js"
import contactoRouter from "./contactoRouter.js"
const router = Router();


router.use("/api", profileRouter)
router.use("/api", cursosRouter)
router.use("/api", contactoRouter)

export default router;