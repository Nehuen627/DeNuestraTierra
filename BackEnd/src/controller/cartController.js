import cartService from "../services/cartService.js";
import userService from "../services/userService.js";
import productosService from "../services/productosService.js";

import { Exception } from "../utils/utils.js";
export default class {
    static async deleteCart(cid){
        return await cartService.remove(cid);
    }

    static async addCart(userEmail){ 
        try {
            const user = await userService.getUserByEmail(userEmail);
            if (!user) {
                throw new Error("User not found");
            }
            return await cartService.create(user.id);
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }
    static async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await this.getCartContentById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
    
            const product = await productosService.getProductById(pid);
            if (!product) {
                throw new Error("Product not found");
            }
    
            const existingProductIndex = cart.products.findIndex(p => 
                p.productId._id === pid
            );
    
            let currentQuantityInCart = 0;
            if (existingProductIndex !== -1) {
                currentQuantityInCart = cart.products[existingProductIndex].quantity;
            }
    
            const totalRequestedQuantity = currentQuantityInCart + quantity;
            if (totalRequestedQuantity > product.stock) {
                const maxAddable = product.stock - currentQuantityInCart;
                
                quantity = maxAddable;
            }
    
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId: { _id: pid },
                    quantity: quantity
                });
            }
    
            return await cartService.findOneAndUpdate({
                _id: cid,
                products: cart.products
            });
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }
    
    static async getCarts(req) {
        try {
            const carts = await cartService.find();
            return carts;
        }
        catch (error) {
            throw new Exception("Error getting carts", 500);
        }
    }

    static async getCartContentById(cid) {
        const cart = await cartService.findById(cid);
        if(!cart){
            throw new Exception("Error fetching cart", 500);    
        }
        return cart
    }
    static async getCartContentByUserId(uid){
        const cart = await cartService.findByUserId(uid);
        if(!cart){
            throw new Exception("Error fetching cart", 500);    
        }
        return cart
    }
    
    static async deleteProductOfCart(cid, pid) {
        try {
            const cart = await this.getCartContentById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }

            return await cartService.deleteCartItem(cid, pid);
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }
    
    
    
    
    
    static async updateProductsArrayOfCart(req, cid, products) {
        const cart = await this.getCartContentById(cid);

        if (cart) {
            try {
                let formattedProducts;
                if (Array.isArray(products.products)) {
                    formattedProducts = products.products;
                } else if (Array.isArray(products)) {
                    formattedProducts = products;
                } else {
                    formattedProducts = [products];
                }
                
                formattedProducts = formattedProducts.map(product => ({
                    productId: product.productId,
                    quantity: product.quantity || 1
                }));

                const updatedCart = await cartService.findOneAndUpdate({
                    _id: cid,
                    products: formattedProducts
                });

                if (!updatedCart) {
                    throw new Exception("Failed to update cart", 500);
                }
    
                return updatedCart;
            } catch (error) {
                throw new Exception("Error updating cart", 500);
            }
        }
    }
    
    static async deleteProductsOfCart(req, cid) {
        const cart = await this.getCartContentById(cid); 
    
        if (cart) {
            try {
                cart.products = []; 
    
                await cartService.findOneAndUpdate({
                    _id: cid,
                    products: cart.products
                });
                return cart; 
            } catch (error) {
                throw new Exception("Error deleting products from the cart", 500);
            }
        }
    }
    

    static async setProductQuantity(cid, pid, quantity) {
        try {
            const cart = await this.getCartContentById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }

            const productIndex = cart.products.findIndex(p => 
                p.productId._id === pid);

            if (productIndex === -1) {
                throw new Error("Product not found in cart");
            }

            cart.products[productIndex].quantity = quantity;

            return await cartService.findOneAndUpdate({
                _id: cid,
                products: cart.products
            });
        } catch (error) {
            throw new Error(`Error updating product quantity: ${error.message}`);
        }
    }

    static async removeProductQuantity(cid, pid, quantityToRemove) {
        try {
            const cart = await this.getCartContentById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }

            const productIndex = cart.products.findIndex(p => 
                p.productId._id === pid);

            if (productIndex === -1) {
                throw new Error("Product not found in cart");
            }

            const currentQuantity = cart.products[productIndex].quantity;

            if (quantityToRemove >= currentQuantity) {
                this.deleteProductOfCart(cid, pid)
                return true
            } else {
                cart.products[productIndex].quantity -= quantityToRemove;
            }
            
            return await cartService.findOneAndUpdate({
                _id: cid,
                products: cart.products
            });
        } catch (error) {
            throw new Error(`Error removing product quantity: ${error.message}`);
        }
    }
}

