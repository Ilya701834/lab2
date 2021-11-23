import menusRepo from './menu.memory.repository';
import categoriesRepo from '../categorys/categorys.memory.repository';
import dishesRepo from '../dishs/dish.memory.repository';
import { TMenu, TMenuModel } from './menu.type';
import { TCategoryModel } from '../categorys/category.type';


const getAll = ():Promise<TMenuModel[]> => menusRepo.getAll();
const getById = (id:string):Promise<TMenuModel | null> => menusRepo.getById(id);
const createMenu = ({ title, photo, isPublish }:TMenu):Promise<TMenuModel | null> =>
  menusRepo.createMenu({ title, photo, isPublish});
const deleteById = async (id:string):Promise<TMenuModel | null> => {
  const menuDeletable = await getById(id);
  await menusRepo.deleteById(id)
  await categoriesRepo.deleteByMenuId(id)
  const categoryId = categoriesRepo.getCategoryByMenuId(id)

  categoryId.map((i)=> dishesRepo.deleteByCategoryId(i.id))
  return menuDeletable;
};
const updateById = (menu:TMenuModel):Promise<TMenuModel | null> =>
  menusRepo.updateById(menu);

const getCategoryIdByMenuId = (id:string):Promise<TCategoryModel[] | null> =>
  categoriesRepo.getCategoryIdByMenuId(id)

export default { getAll, getById, createMenu, deleteById, updateById, getCategoryIdByMenuId};