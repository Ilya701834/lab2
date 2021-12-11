import categoriesRepo from './categorys.memory.repository';
import dishesRepo from '../dishs/dish.memory.repository';
import { TCategory, TCategoryModel } from './category.type';
import { TDishModel } from '../dishs/dish.type';


const getAll = ():Promise<TCategoryModel[]> => categoriesRepo.getAll();
const getById = (id:string):Promise<TCategoryModel | null> => categoriesRepo.getById(id);
const createCategory = ({title, menuId, photo, isVisible}:TCategory):Promise<TCategoryModel | null> =>
  categoriesRepo.createCategory({title, menuId, photo, isVisible});
const deleteById = async (id:string):Promise<TCategoryModel | null> => {
  const categoryDeletable = await getById(id);
  await categoriesRepo.deleteById(id)
  await dishesRepo.deleteByCategoryId(id)
  return categoryDeletable;
};
const updateById = (category: { photo: any; id: string; isVisible: any; title: any }):Promise<TCategoryModel | null> =>
  categoriesRepo.updateById(category);

const getDishByCategoryId = (id:string):Promise<TDishModel[] | null> =>
  dishesRepo.getDishByCategoryId(id)

export default { getAll, getById, createCategory, deleteById, updateById, getDishByCategoryId };