const dishesRepo = require('./dish.memory.repository');


const getAll = () => dishesRepo.getAll();
const getById = (id) => dishesRepo.getById(id);
const createDish = ({categoryId, title, description, photo, isPublish, ingredients, price}) =>
  dishesRepo.createDish({categoryId,title, description, photo, isPublish, ingredients, price});
const deleteById = async (id) => {
  const dishDeletable = await getById(id);
  dishesRepo.deleteById(id)
  return dishDeletable;
};
const updateById = ({ id, categoryId, title, description, photo, isPublish, ingredients, price}) =>
  dishesRepo.updateById({ id, categoryId, title, description, photo, isPublish, ingredients, price});

module.exports = { getAll, getById, createDish, deleteById, updateById };