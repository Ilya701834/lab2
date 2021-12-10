import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Category from './category.entity';
import Dish from '../dishs/dish.entity';
import categoriesService from './category.service';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const categories = await categoriesService.getAll();

    res.status(StatusCodes.OK).json(categories.map((category)=>Category.toResponse(category)))
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {

    const category = await categoriesService.createCategory(req.body);

    if (category) {
      res.status(StatusCodes.CREATED).json(Category.toResponse(category));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await categoriesService.getById( id!);

    if (category) {
      res.json(Category.toResponse(category));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await categoriesService.updateById(id!, req.body);

    if (category) {
      res.status(StatusCodes.OK).json(Category.toResponse(category));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await categoriesService.deleteById( id!);

    if (category) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'CATEGORY_DELETED', msg: 'The category has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  }),
);

router.route('/:id/dishes').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const dishes = await categoriesService.getAllDishes(id || '');

    if (dishes) {
      res.json(dishes.map((el)=>Dish.toResponse(el)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  })
);

export default router;