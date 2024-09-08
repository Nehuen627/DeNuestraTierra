import { Router } from 'express';
import profileRouter from "./profileRouter.js"
import cursosRouter from "./cursosRouter.js"
import contactoRouter from "./contactoRouter.js"
import nosotrosRouter from "./nosotrosRouter.js"
import productosRouter from "./productosRouter.js"

const router = Router();


router.use("/api", profileRouter)
router.use("/api", cursosRouter)
router.use("/api", contactoRouter)
router.use("/api", nosotrosRouter)
router.use("/api", productosRouter)

export default router;