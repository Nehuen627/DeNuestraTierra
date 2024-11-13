import { Router } from 'express';
import productosController from '../controller/productosController.js';

const router = Router();



//route to send Type of wine
router.get("/productos/type", (req, res) => {
    const Type = [
        {Id: 1, Name:"Chardonnay"},
        {Id: 2, Name:"Sauvignon Blanc"},
        {Id: 3, Name:"Semillon"},
        {Id: 4, Name:"Viognier"},
        {Id: 5, Name:"Pinot Grigio"},
        {Id: 6, Name:"Gewürztraminer"},
        {Id: 7, Name:"Malbec"},
        {Id: 8, Name:"Cabernet franc"},
        {Id: 9, Name:"Cabernet Sauvignon"},
        {Id: 10, Name:"Tempranillo"},
        {Id: 11, Name:"Syrah"},
        {Id: 12, Name:"Merlot"},
        {Id: 13, Name:"Pinot noir"},
        {Id: 14, Name:"Bonarda"},
        {Id: 15, Name:"Ancellotta"},
        {Id: 16, Name:"Petit Verdot"}
        
    ];
    res.json(Type);
})



router.get('/productos', productosController.getProducts);

router.get('/productos/:id', productosController.getProductById)

router.post('/demo/productos', productosController.createProduct);

router.delete('/demo/productos/:id', productosController.deleteProduct);

router.patch('/demo/productos/:id', productosController.updateProductById);

router.patch('/demo/productos/stock/:id', productosController.updateStock);

router.patch('/demo/productos/status/:id', productosController.updateStatus)
export default router;

