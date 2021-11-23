import Category from './category.model'
import { TCategory, TCategoryModel } from './category.type';
import dishesRepo from '../dishs/dish.memory.repository';


const Categories:TCategoryModel[] = [new Category()];

const getAll = async ():Promise<TCategoryModel[]> => Categories;

const getById = async (id:string):Promise<TCategoryModel | null> => Categories.find((category) => category.id === id) || null;

const createCategory = async ({menuId, title, photo, isVisible}:TCategory):Promise<TCategoryModel> => {
  const category = new Category({menuId, title, photo, isVisible});
  Categories.push(category);
  return category;
};

const deleteById = async (id:string):Promise<TCategoryModel | null> => {
  const categoryPosition = Categories.findIndex((category) => category.id === id);

  if (categoryPosition === -1) return null;

  const categoryDeletable = Categories[categoryPosition]!;

  Categories.splice(categoryPosition, 1);
  return categoryDeletable;
};

const updateById = async ({id, ...payload}:Partial<TCategoryModel>):Promise<TCategoryModel | null> => {
  const categoryPosition = Categories.findIndex((category) => category.id === id);

  if (categoryPosition === -1) return null;

  const oldCategory = Categories[categoryPosition]!;
  const newCategory = { ...oldCategory, ...payload};

  Categories.splice(categoryPosition, 1, newCategory);
  return newCategory;
};

const deleteByMenuId = async (menuId:string):Promise<void> => {
  const menuCategories = Categories.filter((category) => category.menuId === menuId);

  await Promise.allSettled(menuCategories.map(async (category) => {
    await deleteById(category.id);
    await dishesRepo.deleteByCategoryId(category.id)
  }));
};

const getCategoryIdByMenuId = async (menuId:string):Promise<TCategoryModel[]> => {
  const categories = Categories.filter((category) => category.menuId === menuId)
  return categories
};

const getCategoryByMenuId =  (menuId:string):TCategoryModel[] => {
  const categories = Categories.filter((category) => category.menuId === menuId)
  return categories
};

export default {
  Categories,
  getAll,
  getById,
  createCategory,
  deleteById,
  updateById,
  deleteByMenuId,
  getCategoryIdByMenuId,
  getCategoryByMenuId
};