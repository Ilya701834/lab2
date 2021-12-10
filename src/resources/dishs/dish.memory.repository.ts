import { EntityRepository, AbstractRepository } from 'typeorm';
import DishModel from './dish.entity';

@EntityRepository(DishModel)
export class DishRepository extends AbstractRepository<DishModel> {
  createDish(dish: Omit<DishModel, 'id'>) {
    const dishes = this.repository.create(dish);
    return this.manager.save(dishes);
  }

  getAllDishes() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, dish: Partial<DishModel>) {
    return this.repository.update({ id }, dish);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  deleteByCategoryId(id: string) {
    return this.repository.delete({categoryId: id });
  }

  getDishByCategoryId(id: string) {
    return this.repository.find({ categoryId:id});
  }

}