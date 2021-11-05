const Category = require('./category.model')

const Categories = [new Category()];

const getAll = async () => Categories;

const getById = async (id) => Categories.find((category) => category.id === id);

const createCategory = async ({title, photo, isVisible}) => {
  const category = new Category({title, photo, isVisible});
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

const updateById = async ({id, title, photo, isVisible}) => {
  const categoryPosition = Categories.findIndex((category) => category.id === id);

  if (categoryPosition === -1) return null;

  const oldCategory = Categories[categoryPosition];
  const newCategory = { ...oldCategory, title, photo, isVisible};

  Categories.splice(categoryPosition, 1, newCategory);
  return newCategory;
};

module.exports = {
  Categories,
  getAll,
  getById,
  createCategory,
  deleteById,
  updateById,
};