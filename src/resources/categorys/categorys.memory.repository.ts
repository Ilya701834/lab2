import { EntityRepository, AbstractRepository } from 'typeorm';
import CategoryModel from './category.entity';

@EntityRepository(CategoryModel)
export class CategoryRepository extends AbstractRepository<CategoryModel> {
  createCategory(category: Omit<CategoryModel, 'id'>) {
    const categories = this.repository.create(category);
    return this.manager.save(categories);
  }

  getAllCategories() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, category: Partial<CategoryModel>) {
    return this.repository.update({ id }, category);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  deleteByMenuId(id: string) {
    return this.repository.delete({menuId: id });
  }

  getCategoryByMenuId(id: string) {
    return this.repository.find({ menuId:id});
  }
}