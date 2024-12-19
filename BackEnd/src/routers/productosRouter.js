import { Router } from 'express';
import productosController from '../controller/productosController.js';
import upload from '../middleware/uploadMiddleware.js';
import { authenticateLevel } from '../utils/utils.js';

const router = Router();


/* tipo de productos */
router.get('/productos/type', productosController.getProductosType)
router.post('/productos/type',authenticateLevel(4), productosController.createProductosType)
router.delete('/productos/type/:id',authenticateLevel(4), productosController.deleteProductosType)

/* productos */
router.get('/productos', productosController.getProducts);

router.get('/productos/:id', productosController.getProductById)

router.post('/productos',authenticateLevel(4), upload.single('image'), productosController.createProduct);

router.delete('/productos/:id',authenticateLevel(4), productosController.deleteProduct);

router.patch('/productos/:id',authenticateLevel(4), upload.single('image'), productosController.updateProductById);

router.patch('/productos/stock/:id',authenticateLevel(4), productosController.updateStock);

router.patch('/productos/status/:id', productosController.updateStatus)


export default router;

