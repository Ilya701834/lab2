const categoriesRepo = require('./categorys.memory.repository');
const dishesRepo = require('../dishs/dish.memory.repository');


const getAll = () => categoriesRepo.getAll();
const getById = (id) => categoriesRepo.getById(id);
const createCategory = ({title, menuId, photo, isVisible}) =>
  categoriesRepo.createCategory({title, menuId, photo, isVisible});
const deleteById = async (id) => {
  const categoryDeletable = await getById(id);
  categoriesRepo.deleteById(id)
  dishesRepo.deleteByCategoryId(id)
  return categoryDeletable;
};
const updateById = ({ id, menuId, title, photo, isVisible}) =>
  categoriesRepo.updateById({ id, menuId, title, photo, isVisible});

const getDishByCategoryId = (id) =>
  dishesRepo.getDishByCategoryId(id)

module.exports = { getAll, getById, createCategory, deleteById, updateById, getDishByCategoryId };