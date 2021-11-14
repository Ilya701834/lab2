export interface TCategory {
  menuId:string,
  title:string,
  photo:string,
  isVisible:boolean,
}

export interface TCategoryModel extends TCategory {
  id: string;
}
