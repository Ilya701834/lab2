const Category = require('./category.model')
const dishesRepo = require('../dishs/dish.memory.repository');


const Categories = [new Category()];

const getAll = async () => Categories;

const getById = async (id) => Categories.find((category) => category.id === id);

const createCategory = async ({menuId, title, photo, isVisible}) => {
  const category = new Category({menuId, title, photo, isVisible});
  Categories.push(category);
  return category;
};

const deleteById = async (id) => {
  const categoryPosition = Categories.findIndex((category) => category.id === id);

  if (categoryPosition === -1) return null;

  const categoryDeletable = Categories[categoryPosition];

  Categories.splice(categoryPosition, 1);
  return categoryDeletable;
};

const updateById = async ({id, menuId, title, photo, isVisible}) => {
  const categoryPosition = Categories.findIndex((category) => category.id === id);

  if (categoryPosition === -1) return null;

  const oldCategory = Categories[categoryPosition];
  const newCategory = { ...oldCategory, menuId, title, photo, isVisible};

  Categories.splice(categoryPosition, 1, newCategory);
  return newCategory;
};

const deleteByMenuId = async (menuId) => {
  const menuCategories = Categories.filter((category) => category.menuId === menuId);

  await Promise.allSettled(menuCategories.map(async (category) => {
    deleteById(category.id);
    dishesRepo.deleteByCategoryId(category.id)
  }));
};

const getCategoryIdByMenuId = async (menuId) => {
  const categories = Categories.filter((category) => category.menuId === menuId)
  return categories
};

module.exports = {
  Categories,
  getAll,
  getById,
  createCategory,
  deleteById,
  updateById,
  deleteByMenuId,
  getCategoryIdByMenuId,
};