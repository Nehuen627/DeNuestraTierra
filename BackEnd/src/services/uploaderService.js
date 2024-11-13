import uploaderDao from "../dao/uploaderDao.js";
export default class {
    static async uploadText(text) {
        return await uploaderDao.uploadText(text)
    }
    static async uploadPicture(url, alt) {
        return await uploaderDao.uploadPicture(url, alt)
    }
}