import { v4 as uuid } from 'uuid';

import { TMenu, TMenuModel } from './menu.type';

class Menu {

  id:string
  title:string
  photo:string
  isPublish:boolean

    constructor({
                    title = 'BOARD',
                    photo = `photo.png`,
                    isPublish=true
    }:Partial<TMenu> = {}) {
        this.id = uuid();
        this.title = title;
        this.photo = photo;
        this.isPublish = isPublish;
    }

    static toResponse(menu:TMenuModel):TMenuModel {
        const { id, title, photo, isPublish } = menu;
        return { id, title, photo, isPublish };
    }
}

export default Menu;