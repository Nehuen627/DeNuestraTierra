import cartDao from "../dao/cartDao.js"
export default class {
    static async create(userEmail) {
        return await cartDao.create(userEmail)
    }
    static async findById(cid) {
        return await cartDao.findById(cid)
    }
    static async findByUserId(uid) {
        return await cartDao.findByUserId(uid)
    }
    static async findOneAndUpdate(criteria) {
        return await cartDao.findOneAndUpdate(criteria)
    }
    static async find() {
        return await cartDao.find()
    }
    static async remove(cid){
        return await cartDao.remove(cid)
    }
    static async deleteCartItem(cid, pid, tid){
        return await cartDao.deleteCartItem(cid, pid, tid)
    }
}