import { getCustomRepository } from 'typeorm';
import MenuModel from './menu.entity';

import { MenuRepository } from './menu.memory.repository';
import { CategoryRepository } from '../categorys/categorys.memory.repository';
import { DishRepository } from '../dishs/dish.memory.repository';
import CategoryModel from '../categorys/category.entity';


const createMenu = async (data: Omit<MenuModel, 'id'>): Promise<MenuModel> => {
  const menuRepository = getCustomRepository(MenuRepository);
  const menu = await menuRepository.createMenu(data);
  return menu;
};

const getAll = async (): Promise<MenuModel[]> => {
  const menuRepository = getCustomRepository(MenuRepository);
  return menuRepository.getAllMenus();
};

const getById = async (id: string): Promise<MenuModel | null> => {
  const menuRepository = getCustomRepository(MenuRepository);
  const menu = await menuRepository.getById(id);
  if (!menu) return null;
  return menu;
};

const deleteById = async (id: string): Promise<MenuModel | null> => {
  const menuRepository = getCustomRepository(MenuRepository);
  const menuDeletable = await menuRepository.getById(id);
  const categoryRepository = getCustomRepository(CategoryRepository);
  const dishRepository = getCustomRepository(DishRepository);
  const categories = categoryRepository.getCategoryByMenuId(id)

  if (!menuDeletable) return null;
  await menuRepository.deleteById(id);
  await categoryRepository.deleteByMenuId(id)
  await categories.then(category=>{
    category.map(el=>dishRepository.deleteByCategoryId(el.id))
  })
  return menuDeletable;
};

const updateById = async (id: string, data: Omit<MenuModel, 'id'>): Promise<MenuModel | null> => {
  const menuRepository = getCustomRepository(MenuRepository);
  await menuRepository.updateById(id, data);
  const menu = await menuRepository.getById(id);
  if (!menu) return null;
  return menu;
};

const getAllCategory = async (id: string): Promise<CategoryModel[]> => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  return categoryRepository.getCategoryByMenuId(id);
};

export default { getAll, getById, createMenu, deleteById, updateById, getAllCategory };