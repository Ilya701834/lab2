const { v4: uuid } = require('uuid');

class Dish {
    constructor({ id = uuid(),
                    title = 'BOARD',
                    description = `description`,
                    photo = `photo.png`,
                    isPublish=true,
                    ingredients = [''],
                    price = 1000
    } = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.isPublish = isPublish;
        this.ingredients = ingredients;
        this.price = price;
    }

    static toResponse(dish) {
        const { id, title, description, photo, isPublish, ingredients, price} = dish;
        return { id, title, description, photo, isPublish, ingredients, price};
    }
}

module.exports = Dish;