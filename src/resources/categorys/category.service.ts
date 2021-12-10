import { getCustomRepository } from 'typeorm';
import CategoryModel from './category.entity';

import { CategoryRepository } from './categorys.memory.repository';
import { DishRepository } from '../dishs/dish.memory.repository';
import DishModel from '../dishs/dish.entity';


const createCategory = async (data: Omit<CategoryModel, 'id'>): Promise<CategoryModel> => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category = await categoryRepository.createCategory(data);
  return category;
};

const getAll = async (): Promise<CategoryModel[]> => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  return categoryRepository.getAllCategories();
};

const getById = async (id: string): Promise<CategoryModel | null> => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category = await categoryRepository.getById(id);
  if (!category) return null;
  return category;
};

const deleteById = async (id: string): Promise<CategoryModel | null> => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const dishRepository = getCustomRepository(DishRepository);
  const categoryDeletable = await categoryRepository.getById(id);
  if (!categoryDeletable) return null;
  await categoryRepository.deleteById(id);
  await dishRepository.deleteByCategoryId(id)

  return categoryDeletable;
};

const updateById = async (id: string, data: Omit<CategoryModel, 'id'>): Promise<CategoryModel | null> => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  await categoryRepository.updateById(id, data);
  const category = await categoryRepository.getById(id);
  if (!category) return null;
  return category;
};

const getAllDishes = async (id: string): Promise<DishModel[]> => {
  const dishRepository = getCustomRepository(DishRepository);
  return dishRepository.getDishByCategoryId(id);
};

export default { getAll, getById, createCategory, deleteById, updateById, getAllDishes };