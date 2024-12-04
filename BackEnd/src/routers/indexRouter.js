import { Router } from 'express';
import profileRouter from "./profileRouter.js"
import talleresRouter from "./talleresRouter.js"
import contactoRouter from "./contactoRouter.js"
import nosotrosRouter from "./nosotrosRouter.js"
import productosRouter from "./productosRouter.js"
import userRouter from "./userRouter.js"
import sessionsRouter from "./sessionRouter.js"
import cartRouter from "./cartRouter.js"
const router = Router();


router.use("/api", profileRouter)
router.use("/api", talleresRouter)
router.use("/api", contactoRouter)
router.use("/api", nosotrosRouter)
router.use("/api", productosRouter)
router.use("/api", cartRouter)
router.use("/api", userRouter)
router.use("/auth", sessionsRouter)

export default router;