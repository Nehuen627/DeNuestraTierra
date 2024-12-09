import { json, Router } from 'express';
import cartController from "../controller/cartController.js"
import productosService from '../services/productosService.js';
const router = Router();

router.post("/carts", async (req, res) => {
    try {
        let { body: data } = req;
        let userEmail = data.userEmail
        const cart = await cartController.addCart(userEmail);

        if (cart) {
            res.status(201).send({
                message: "Cart created successfully",
                cart: cart
            });
        } else {
            res.status(404).send("Cart not created.");
        }
    } catch (error) {
        res.status(500).send({message: "Error adding cart.",  error: error.message });
    }
});
router.get("/carts", async (req, res) => {
    try {
        const carts = await cartController.getCarts(req);
        for (let i = 0; i < carts.length; i++) {
            const element = carts[i];
            element.title = i;
        }
        if (carts) {
            res.status(201).send({
                carts: carts
            });
        } else {
            res.status(400).send({ message: "No carts found" })
        }
    }
    catch (error) {
        res.status(500).send({ message: "Error getting carts", error: error.message });
    }
})

router.get("/carts/:cid", async (req, res) => {
    const id = req.params.cid;
    try {
        const cart = await cartController.getCartContentById(id);
        if (cart) {
            res.send({cart: cart})
        } else {
            res.status(404).send({ message: "There is no cart by that id" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error finding cart", error: error.message });
    }
})

router.put("/carts/:cid", async (req, res) => {
    const idCart = req.params.cid;
    const products = req.body;
    
    try {
        const updatedCart = await cartController.updateProductsArrayOfCart(req, idCart, products);

        if (updatedCart) {
            res.status(200).send({ message: "Products in the cart updated", cart: updatedCart });
        } else {
            res.status(400).send({ message: "Error updating the products in the cart" });
        }
    } catch (error) {
        res.status(500).send({message: "Error updating the cart or the products",  error: error.message});
    }
})
router.delete("/carts/:cid", async (req, res) => {
    const idCart = req.params.cid;
    try {
        const updatedCart = await cartController.deleteProductsOfCart(req, idCart);

        if (updatedCart) {
            res.status(200).send({ message: "All products deleted from the cart", cart: updatedCart });
        } else {
            res.status(400).send({ message: "Error deleting the products from the cart" });
        }
    } catch (error) {
        res.status(500).send({message: "Error updating the cart or deleting the products",  error: error.message});
    }
})

router.post("/carts/:cid/producto/:pid", async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const quantity = parseInt(req.body.quantity1) || 1;
        
    try {
        const product = await productosService.getProductById(idProduct);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const updatedCart = await cartController.addProductToCart(idCart, idProduct, quantity);

        if (updatedCart) {
            res.status(200).send({
                message: "Product added to cart successfully",
                cart: updatedCart
            });
        } else {
            res.status(400).send({ message: "Error adding the product to the cart" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error updating the cart or adding the product",
            error: error.message
        });
    }
});

router.put("/carts/:cid/producto/:pid", async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const { quantity } = req.body;
    

    if (!quantity || quantity < 0) {
        return res.status(400).send({ message: "Invalid quantity provided" });
    }

    try {
        const updatedCart = await cartController.setProductQuantity(idCart, idProduct, quantity);
        res.status(200).send({ 
            message: "Product quantity updated", 
            cart: updatedCart 
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating product quantity",
            error: error.message
        });
    }
});

router.delete("/carts/:cid/producto/:pid", async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const { quantity = 1 } = req.body;

    try {
        const updatedCart = await cartController.removeProductQuantity(idCart, idProduct, quantity);
        res.status(200).send({ 
            message: "Product quantity removed from cart", 
            cart: updatedCart 
        });
    } catch (error) {
        res.status(500).send({
            message: "Error removing product from cart",
            error: error.message
        });
    }
});


router.delete("/carts/erase/:cid", async (req, res) => {
    const idCart = req.params.cid;
    
    try {
        const result = await cartController.deleteCart(idCart);
        
        if (result) {
            res.status(200).send({ 
                message: "Cart deleted successfully" 
            });
        } else {
            res.status(404).send({ 
                message: "Cart not found or could not be deleted" 
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error deleting cart",
            error: error.message
        });
    }
});
router.get('/carts/user/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const cart = await cartController.getCartContentByUserId(uid);
        if (cart) {
            res.json(cart)
        } else {
            res.status(404).send({ message: "There is no cart by that user id" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error finding cart", error: error.message });
    }
})
router.delete('/carts/:cid/producto/:pid/erase', async (req, res) =>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    try {
        const updatedCart = await cartController.deleteProductOfCart(idCart, idProduct);
        res.status(200).send({ 
            message: "Product quantity removed from cart", 
            cart: updatedCart 
        });
    } catch (error) {
        res.status(500).send({
            message: "Error removing product from cart",
            error: error.message
        });
    }
})
/* router.post("/carts/:cid/purchase", async (req, res) => {
    const idCart = req.params.cid;
    
    try {
        // Assuming there's a purchase method in the cartController
        const purchaseResult = await cartController.purchaseCart(idCart);

        if (purchaseResult) {
            res.status(200).send({
                message: "Purchase completed successfully",
                details: purchaseResult
            });
        } else {
            res.status(400).send({ message: "Error completing the purchase" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error processing the purchase",
            error: error.message
        });
    }
}); */
export default router;