import { Router } from 'express';
import productosController from '../controller/productosController.js';

const router = Router();


/* tipo de productos */
router.get('/productos/type', productosController.getProductosType)
router.post('/productos/type', productosController.createProductosType)
router.delete('/productos/type/:id', productosController.deleteProductosType)

/* productos */
router.get('/productos', productosController.getProducts);

router.get('/productos/:id', productosController.getProductById)

router.post('/demo/productos', productosController.createProduct);

router.delete('/demo/productos/:id', productosController.deleteProduct);

router.patch('/demo/productos/:id', productosController.updateProductById);

router.patch('/demo/productos/stock/:id', productosController.updateStock);

router.patch('/demo/productos/status/:id', productosController.updateStatus)
export default router;

