import userDao from "../dao/userDao.js";
export default class {
    static async getUserById(id){
        return userDao.getUserById(id)
    }
    static async deleteUserById(id){
        return userDao.deleteUserById(id)
    }
    static async getUserByEmail(email){
        return userDao.getUserByEmail(email)
    }
    static async create(finalData){
        return userDao.create(finalData)
    }
    static async updateUserById(id, user) {
        return userDao.updateUserById(id, user)
    }
    static async getUsers(){
        return userDao.getUsers()
    }
}