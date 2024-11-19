import talleresDao from "../dao/talleresDao.js";
export default class {
    static async getTalleres() {
        return talleresDao.getTalleres()
    }
    static async getTallerById(id) {
        return talleresDao.getTallerById(id)
    }
    static async createTaller(tallerData) {
        tallerData.skills = JSON.stringify(tallerData.skills);
        return talleresDao.createTaller(tallerData)
    }
    static async deleteTaller(id) {
        return talleresDao.deleteTaller(id)
    }
    static async updateTallerById(id, updates) {
        return talleresDao.updateTallerById(id, updates)
    }
}