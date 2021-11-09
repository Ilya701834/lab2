const Menu = require('./menu.model')

const Menus = [new Menu()];

const getAll = async () => Menus;

const getById = async (id) => Menus.find((menu) => menu.id === id);

const createMenu = async ({title, photo, isPublish  }) => {
  const menu = new Menu({ title, photo, isPublish });
  Menus.push(menu);
  return menu;
};

const deleteById = async (id) => {
  const menuPosition = Menus.findIndex((menu) => menu.id === id);

  if (menuPosition === -1) return null;

  const menuDeletable = Menus[menuPosition];

  Menus.splice(menuPosition, 1);
  return menuDeletable;
};

const updateById = async ({ id, title, photo, isPublish }) => {
  const menuPosition = Menus.findIndex((menu) => menu.id === id);

  if (menuPosition === -1) return null;

  const oldMenu = Menus[menuPosition];
  const newMenu = { ...oldMenu, title, photo, isPublish };

  Menus.splice(menuPosition, 1, newMenu);
  return newMenu;
};

module.exports = {
  Menus,
  getAll,
  getById,
  createMenu,
  deleteById,
  updateById,
};