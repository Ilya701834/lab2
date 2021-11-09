const Dish = require('./dish.model')

const Dishes = [new Dish()];

const getAll = async () => Dishes;

const getById = async (id) => Dishes.find((dish) => dish.id === id);

const createDish = async ({categoryId, title, description, photo, isPublish, ingredients, price}) => {
  const dish = new Dish({categoryId, title, description, photo, isPublish, ingredients, price });
  Dishes.push(dish);
  return dish;
};

const deleteById = async (id) => {
  const dishPosition = Dishes.findIndex((dish) => dish.id === id);

  if (dishPosition === -1) return null;

  const dishDeletable = Dishes[dishPosition];

  Dishes.splice(dishPosition, 1);
  return dishDeletable;
};

const updateById = async ({id, categoryId, title, description, photo, isPublish, ingredients, price}) => {
  const dishPosition = Dishes.findIndex((dish) => dish.id === id);

  if (dishPosition === -1) return null;

  const oldDish = Dishes[dishPosition];
  const newDish = { ...oldDish, categoryId, title, description, photo, isPublish, ingredients, price};

  Dishes.splice(dishPosition, 1, newDish);
  return newDish;
};

const deleteByCategoryId = async (categoryId) => {
  const categoryDish = Dishes.filter((dish) => dish.categoryId === categoryId);

  await Promise.allSettled(categoryDish.map(async (dish) => deleteById(dish.id)));
};

const getDishByCategoryId = async (categoryId) => {
  const dishes = Dishes.filter((dish) => dish.categoryId === categoryId)
  return dishes
};

module.exports = {
  Dishes,
  getAll,
  getById,
  createDish,
  deleteById,
  updateById,
  deleteByCategoryId,
  getDishByCategoryId
};