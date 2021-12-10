import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Dish from './dish.entity';
import dishesService from './dish.service';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const dishes = await dishesService.getAll();

    res.status(StatusCodes.OK).json(dishes.map((dish)=>Dish.toResponse(dish)))
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {

    const dish = await dishesService.createDish(req.body);

    if (dish) {
      res.status(StatusCodes.CREATED).json(Dish.toResponse(dish));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const dish = await dishesService.getById( id!);

    if (dish) {
      res.json(Dish.toResponse(dish));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const dish = await dishesService.updateById(id!, req.body);

    if (dish) {
      res.status(StatusCodes.OK).json(Dish.toResponse(dish));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const dish = await dishesService.deleteById( id!);

    if (dish) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'DISH_DELETED', msg: 'The dish has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  }),
);

export default router;