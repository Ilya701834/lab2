import { EntityRepository, AbstractRepository } from 'typeorm';
import MenuModel from './menu.entity';

@EntityRepository(MenuModel)
export class MenuRepository extends AbstractRepository<MenuModel> {
  createMenu(menu: Omit<MenuModel, 'id'>) {
    const menus = this.repository.create(menu);
    return this.manager.save(menus);
  }

  getAllMenus() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, menu: Partial<MenuModel>) {
    return this.repository.update({ id }, menu);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  getCategoryByMenuId(id: string) {
    return this.repository.find({ id });
  }
}