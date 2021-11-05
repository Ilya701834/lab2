const categoriesRepo = require('./categorys.memory.repository');


const getAll = () => categoriesRepo.getAll();
const getById = (id) => categoriesRepo.getById(id);
const createCategory = ({title, photo, isVisible}) =>
  categoriesRepo.createCategory({title, photo, isVisible});
const deleteById = async (id) => {
  const categoryDeletable = await getById(id);
  categoriesRepo.deleteById(id)
  return categoryDeletable;
};
const updateById = ({ id, title, photo, isVisible}) =>
  categoriesRepo.updateById({ id, title, photo, isVisible});

module.exports = { getAll, getById, createCategory, deleteById, updateById };