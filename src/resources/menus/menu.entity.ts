import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'menus' })
export default class Menu {

  @PrimaryColumn('uuid')
  public id:string = uuid();

  @Column()
  public title:string = 'Title';

  @Column()
  photo:string='photo.png';

  @Column()
  isPublish:boolean=true;


  static toResponse(menu: Omit<Menu, 'id'>) {
    return menu;
  }
}