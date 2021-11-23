export interface TMenu {
  title:string,
  photo:string,
  isPublish:boolean
}

export interface TMenuModel extends TMenu {
  id: string;
}