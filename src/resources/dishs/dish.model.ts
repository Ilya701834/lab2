import { v4 as uuid } from 'uuid';

import { TDish, TDishModel } from './dish.type';

class Dish {

  id:string

  categoryId: string | null

  title: string

  description: string

  photo:string

  isPublish:boolean

  ingredients: string[]

  price:number

    constructor({
                    categoryId = 'null',
                    title = 'BOARD',
                    description = `description`,
                    photo = `photo.png`,
                    isPublish=true,
                    ingredients = [''],
                    price = 1000
    }: Partial<TDish> = {}) {
        this.id = uuid();
        this.categoryId= categoryId;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.isPublish = isPublish;
        this.ingredients = ingredients;
        this.price = price;
    }

    static toResponse(dish: TDishModel): TDishModel {
        const { id, categoryId, title, description, photo, isPublish, ingredients, price} = dish;
        return { id, categoryId, title, description, photo, isPublish, ingredients, price};
    }
}

export default Dish;