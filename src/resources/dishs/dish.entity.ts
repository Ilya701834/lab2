import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'dishes' })
export default class Dish {

  @PrimaryColumn('uuid')
  public id:string = uuid();

  @Column()
  public title:string = 'Title';

  @Column()
  description: string = 'Description'

  @Column()
  photo:string='photo.png';

  @Column()
  isPublish:boolean=true;

  @Column('jsonb')
  ingredients:string[]=[];

  @Column()
  price:number=0;

  @Column('varchar', { length: 36, nullable: true })
  categoryId!:string | null;
  


  static toResponse(dish: Omit<Dish, 'id'>) {
    return dish;
  }
}
