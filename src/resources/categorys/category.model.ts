import { v4 as uuid } from 'uuid';

import { TCategory, TCategoryModel} from './category.type';



class Category {

  id:string

  menuId:string

  title:string

  photo:string

  isVisible:boolean

    constructor({
                    menuId='null',
                    title = 'BOARD',
                    photo = `photo.png`,
                    isVisible=true,
                }:Partial<TCategory> = {}) {
        this.id = uuid();
        this.menuId = menuId;
        this.title = title;
        this.photo = photo;
        this.isVisible = isVisible;
    }

    static toResponse(category:TCategoryModel):TCategoryModel {
        const { id, menuId, title, photo, isVisible} = category;
        return { id, menuId, title, photo, isVisible};
    }
}

export default Category;