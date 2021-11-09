const menusRepo = require('./menu.memory.repository');
const categoriesRepo = require('../categorys/categorys.memory.repository');
const dishesRepo = require('../dishs/dish.memory.repository');


const getAll = () => menusRepo.getAll();
const getById = (id) => menusRepo.getById(id);
const createMenu = ({ title, photo, isPublish }) =>
  menusRepo.createMenu({ title, photo, isPublish});
const deleteById = async (id) => {
  const menuDeletable = await getById(id);
  menusRepo.deleteById(id)
  categoriesRepo.deleteByMenuId(id)
  dishesRepo.deleteByCategoryId(categoriesRepo.getCategoryIdByMenuId.id)
  return menuDeletable;
};
const updateById = ({ id, title, photo, isPublish }) =>
  menusRepo.updateById({ id, title, photo, isPublish });

const getCategoryIdByMenuId = (id) =>
  categoriesRepo.getCategoryIdByMenuId(id)

module.exports = { getAll, getById, createMenu, deleteById, updateById, getCategoryIdByMenuId};