import Menu from './menu.model'

import { TMenu ,TMenuModel } from './menu.type';

const Menus:TMenuModel[] = [new Menu()];

const getAll = async ():Promise<TMenuModel[]> => Menus;

const getById = async (id:string):Promise<TMenuModel | null> => Menus.find((menu) => menu.id === id)|| null;

const createMenu = async ({title, photo, isPublish  }:TMenu):Promise<TMenuModel | null> => {
  const menu = new Menu({ title, photo, isPublish });
  Menus.push(menu);
  return menu;
};

const deleteById = async (id:string):Promise<TMenuModel | null> => {
  const menuPosition = Menus.findIndex((menu) => menu.id === id);

  if (menuPosition === -1) return null;

  const menuDeletable = Menus[menuPosition]!;

  Menus.splice(menuPosition, 1);
  return menuDeletable;
};

const updateById = async ({ id, ...payload}: Partial<TMenuModel>):Promise<TMenuModel | null> => {
  const menuPosition = Menus.findIndex((menu) => menu.id === id);

  if (menuPosition === -1) return null;

  const oldMenu = Menus[menuPosition]!;
  const newMenu = { ...oldMenu, ...payload};

  Menus.splice(menuPosition, 1, newMenu);
  return newMenu;
};

export default {
  Menus,
  getAll,
  getById,
  createMenu,
  deleteById,
  updateById,
};