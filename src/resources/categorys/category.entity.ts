import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'categories' })
export default class Category {

  @PrimaryColumn('uuid')
  public id:string = uuid();

  @Column('varchar', { length: 36, nullable: true })
  menuId!:string | null

  @Column()
  public title:string = 'Title'

  @Column()
  photo:string='photo.png'

  @Column()
  isVisible:boolean=true


  static toResponse(category: Omit<Category, 'id'>) {
    return category;
  }
}

