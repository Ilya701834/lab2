const { v4: uuid } = require('uuid');

class Category {
    constructor({ id = uuid(),
                    title = 'BOARD',
                    photo = `photo.png`,
                    isVisible=true,
                } = {}) {
        this.id = id;
        this.title = title;
        this.photo = photo;
        this.isVisible = isVisible;
    }

    static toResponse(category) {
        const { id, title, photo, isVisible} = category;
        return { id, title, photo, isVisible};
    }
}

module.exports = Category;