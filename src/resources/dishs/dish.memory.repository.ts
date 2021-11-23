import Dish from './dish.model';
import { TDish, TDishModel } from './dish.type';

const Dishes:TDishModel[] = [new Dish()];

const getAll = async (): Promise<TDishModel[]> => Dishes;

const getById = async (id: string):Promise<TDishModel | null> => Dishes.find((dish) => dish.id === id) || null;

const createDish = async ({categoryId, title, description, photo, isPublish, ingredients, price}: TDish):Promise<TDishModel> => {
  const dish = new Dish({categoryId, title, description, photo, isPublish, ingredients, price });
  Dishes.push(dish);
  return dish;
};

const deleteById = async (id:string):Promise<TDishModel | null> => {
  const dishPosition = Dishes.findIndex((dish) => dish.id === id);

  if (dishPosition === -1) return null;

  const dishDeletable = Dishes[dishPosition]!;

  Dishes.splice(dishPosition, 1);
  return dishDeletable;
};

const updateById = async ({id, ...payload}: Partial<TDishModel>):Promise<TDishModel | null> => {
  const dishPosition = Dishes.findIndex((dish) => dish.id === id);

  if (dishPosition === -1) return null;

  const oldDish = Dishes[dishPosition]!;
  const newDish = { ...oldDish, ...payload};

  Dishes.splice(dishPosition, 1, newDish);
  return newDish;
};

const deleteByCategoryId = async (categoryId:string):Promise<void> => {
  const categoryDish = Dishes.filter((dish) => dish.categoryId === categoryId);

  await Promise.allSettled(categoryDish.map(async (dish) => deleteById(dish.id)));
};

const getDishByCategoryId = async (categoryId:string):Promise<TDishModel[] | null> => {
  const dishes = Dishes.filter((dish) => dish.categoryId === categoryId)
  return dishes
};

export default {
  Dishes,
  getAll,
  getById,
  createDish,
  deleteById,
  updateById,
  deleteByCategoryId,
  getDishByCategoryId
};