import dishesRepo from './dish.memory.repository';
import { TDish, TDishModel } from './dish.type';


const getAll = ():Promise<TDishModel[]> => dishesRepo.getAll();
const getById = (id:string):Promise<TDishModel | null> => dishesRepo.getById(id);
const createDish = ({categoryId, title, description, photo, isPublish, ingredients, price}:TDish):Promise<TDishModel | null> =>
  dishesRepo.createDish({categoryId,title, description, photo, isPublish, ingredients, price});
const deleteById = async (id:string):Promise<TDishModel | null> => {
  const dishDeletable = await getById(id);
  dishesRepo.deleteById(id)
  return dishDeletable;
};
const updateById = (dish:TDishModel):Promise<TDishModel | null> =>
  dishesRepo.updateById(dish);


export default { getAll, getById, createDish, deleteById, updateById };