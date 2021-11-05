const Dish = require('./dish.model')

const Dishes = [new Dish()];

const getAll = async () => Dishes;

const getById = async (id) => Dishes.find((dish) => dish.id === id);

const createDish = async ({title, description, photo, isPublish, ingredients, price}) => {
  const dish = new Dish({ title, description, photo, isPublish, ingredients, price });
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

const updateById = async ({id, title, description, photo, isPublish, ingredients, price}) => {
  const dishPosition = Dishes.findIndex((dish) => dish.id === id);

  if (dishPosition === -1) return null;

  const oldDish = Dishes[dishPosition];
  const newDish = { ...oldDish, title, description, photo, isPublish, ingredients, price};

  Dishes.splice(dishPosition, 1, newDish);
  return newDish;
};

module.exports = {
  Dishes,
  getAll,
  getById,
  createDish,
  deleteById,
  updateById,
};