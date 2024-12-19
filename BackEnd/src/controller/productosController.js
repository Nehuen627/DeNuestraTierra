import productosService from "../services/productosService.js";
export default class {
    static async getProducts(req, res) {
        const { query, rating, category, sortPrice, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
    
        try {
            const { productos, totalPages } = await productosService.getFilteredProducts({
                query, rating, category, sortPrice, limit: Number(limit), offset
            });
            res.json({ productos, totalPages });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }
    
    static async getProductById(req, res) { 
        const { id } = req.params;
        try {
            const product = await productosService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            res.status(500).json({ message: 'Error fetching product', error });
        }
    }
    static async updateProductById(req, res) {
        const { id } = req.params;
        const updates = req.body;  
        try {
            const updatedProduct = await productosService.updateProductById(id, updates);
            res.json(updatedProduct);
        } catch (error) {
            console.log(error);
                        
            res.status(500).json({ message: 'Error updating product', error });
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await productosService.deleteProductById(id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }

    static async createProduct(req, res) {
        try {
            const productData = req.body;
            
            if (req.file) {
                productData.imgUrl = `/uploads/${req.file.filename}`;
            }
    
            const product = await productosService.addProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: error.message, stack: error.stack });
        }
    }
    static async updateStock(req, res) {
        const { id } = req.params;
        const { updateType, number } = req.body; 

        try {
            let product = await productosService.getProductById(id);
            if (!product) return res.status(404).json({ message: "Product not found" });

            if (updateType === "Add") {
                product.stock += number;
                product.status = 1;  
            } else if (updateType === "Subtract") {
                product.stock -= number;
                if (product.stock <= 0) {
                    product.stock = 0; 
                    product.status = 0; 
                }
            }

            const updatedProduct = await productosService.updateProductById(id, product);
            res.json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating stock', error });
        }
    }
    static async updateStatus(req, res) {
        const { id } = req.params;
        const { updateType } = req.body; 
        try {
            let product = await productosService.getProductById(id);
            if (!product) return res.status(404).json({ message: "Product not found" });

            if (updateType === true) {
                product.status = 1;
            } else {
                product.status = 0;
            }
            const updatedProduct = await productosService.updateProductById(id, product);
            res.json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating status', error });
        }
        
    }




    /* type */
    static async getProductosType(req, res) {
        try {
            const productosType = await productosService.getProductosType()
            res.json(productosType);
        } catch (error) {
            console.error('Error fetching productosType:', error);
            res.status(500).json({ message: 'Error fetching prodcutosType', error });
        }
    }
    static async createProductosType(req, res) {
        try {
            const productosTypeData = req.body; 
            
            const newproductosType = await productosService.createProductosType(productosTypeData);
            
            res.status(201).json({ message: 'productosType created successfully', productosType: newproductosType });
        } catch (error) {
            res.status(500).json({ message: 'Error creating productosType', error });
        }
    }
    static async deleteProductosType(req, res) {
        try {
            const { id } = req.params;
            await productosService.deleteProductosType(id);
            res.status(200).json({ message: 'productosType deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting productosType', error });
        }
    }
}