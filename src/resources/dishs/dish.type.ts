export interface TDish {
  categoryId: string | null,
  title: string,
  description: string,
  photo:string,
  isPublish:boolean,
  ingredients: string[],
  price:number
}

export interface TDishModel extends TDish {
  id: string;
}
