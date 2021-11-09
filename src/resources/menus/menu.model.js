const { v4: uuid } = require('uuid');

class Menu {
    constructor({ id = uuid(), title = 'BOARD', photo = `photo.png`, isPublish=true } = {}) {
        this.id = id;
        this.title = title;
        this.photo = photo;
        this.isPublish = isPublish;
    }

    static toResponse(menu) {
        const { id, title, photo, isPublish } = menu;
        return { id, title, photo, isPublish };
    }
}

module.exports = Menu;