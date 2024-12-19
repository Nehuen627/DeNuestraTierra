import nosotrosDao from '../dao/nosotrosDao.js';

export default class NosotrosService {
    static async getText() {
        return await nosotrosDao.getText();
    }

    static async getPictures() {
        return await nosotrosDao.getPictures();
    }

    static async updateText(newText) {
        return await nosotrosDao.updateText(newText);
    }

    static async deleteImageById(id) {
        return await nosotrosDao.deleteImageById(id);
    }

    static async addImage(imageUrl) {
        return await nosotrosDao.addImage(imageUrl);
    }
}
