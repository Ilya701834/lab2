import { getCustomRepository } from 'typeorm';
import DishModel from './dish.entity';

import { DishRepository } from './dish.memory.repository';


const createDish = async (data: Omit<DishModel, 'id'>): Promise<DishModel> => {
  const dishRepository = getCustomRepository(DishRepository);
  const dish = await dishRepository.createDish(data);
  return dish;
};

const getAll = async (): Promise<DishModel[]> => {
  const dishRepository = getCustomRepository(DishRepository);
  return dishRepository.getAllDishes();
};

const getById = async (id: string): Promise<DishModel | null> => {
  const dishRepository = getCustomRepository(DishRepository);
  const dish = await dishRepository.getById(id);
  if (!dish) return null;
  return dish;
};

const deleteById = async (id: string): Promise<DishModel | null> => {
  const dishRepository = getCustomRepository(DishRepository);
  const dishDeletable = await dishRepository.getById(id);
  if (!dishDeletable) return null;
  await dishRepository.deleteById(id);

  return dishDeletable;
};

const updateById = async (id: string, data: Omit<DishModel, 'id'>): Promise<DishModel | null> => {
  const dishRepository = getCustomRepository(DishRepository);
  await dishRepository.updateById(id, data);
  const dish = await dishRepository.getById(id);
  if (!dish) return null;
  return dish;
};

export default { getAll, getById, createDish, deleteById, updateById };