import productosDao from "../dao/productosDao.js";
export default class {
    static async getFilteredProducts(filters) {
        return await productosDao.getFilteredProductsFromDB(filters);
    }
    static async getProductById(id) {
        return productosDao.getProductById(id)
    }
    static async updateProductById(id, updates) {
        return await productosDao.updateProductById(id, updates);
    }
    static async deleteProductById(id) {
        return await productosDao.deleteProduct(id);
    }
    static async addProduct(productData) {
        return await productosDao.insertProduct(productData);
    }




    static async getProductosType() {
        return await productosDao.getProductosType()
    }
    static async createProductosType(prodcutosTypeData) {
        return await productosDao.createProductosType(prodcutosTypeData)
    }
    static async deleteProductosType(id) {
        return await productosDao.deleteProductosType(id)
    }
}