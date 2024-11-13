import nosotrosDao from '../dao/nosotrosDao.js';

export default class NosotrosService {
    static async getText() {
        return await nosotrosDao.getText();
    }

    static async getPictures() {
        return await nosotrosDao.getPictures();
    }
}
