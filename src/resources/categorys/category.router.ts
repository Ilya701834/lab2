import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import Category from './category.model';

import categoriesService from './category.service';
import catchErrors from '../../common/catchErrors';
import Dishes from '../dishs/dish.model';

const router = Router({mergeParams: true})

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const categories = await categoriesService.getAll();

    res.json(categories.map(Category.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const {title, menuId, photo, isVisible} = req.body;

    const category = await categoriesService.createCategory({title, menuId, photo, isVisible});

    if (category) {
      res.status(StatusCodes.CREATED).json(Category.toResponse(category));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CATEGORY_NOT_CREATE', msg: 'Category not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await categoriesService.getById(id || '');

    if (category) {
      res.json(Category.toResponse(category));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {title, photo, isVisible} = req.body;

    const category = await categoriesService.updateById({id:id ||'', title, photo, isVisible});

    if (category) {
      res.status(StatusCodes.OK).json(Category.toResponse(category));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await categoriesService.deleteById(id|| '');

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'CATEGORY_DELETED', msg: 'The category has been deleted' });
  })
);

router.route('/:id/dishes').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const dishes = await categoriesService.getDishByCategoryId(id || '');

    if (dishes) {
      res.json(dishes.map((el)=>Dishes.toResponse(el)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  })
);

export default router;