import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Category from '../categorys/category.entity';
import Menu from './menu.entity';
import menusService from './menu.service';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const menus = await menusService.getAll();

    res.status(StatusCodes.OK).json(menus.map((menu)=>Menu.toResponse(menu)))
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {

    const menu = await menusService.createMenu(req.body);

    if (menu) {
      res.status(StatusCodes.CREATED).json(Menu.toResponse(menu));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const menu = await menusService.getById( id!);

    if (menu) {
      res.json(Menu.toResponse(menu));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const menu = await menusService.updateById(id!, req.body);

    if (menu) {
      res.status(StatusCodes.OK).json(Menu.toResponse(menu));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const menu = await menusService.deleteById( id!);

    if (menu) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'MENU_DELETED', msg: 'The menu has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  }),
);

router.route('/:id/categories').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const categories = await menusService.getAllCategory(id || '');

    if (categories) {
      res.json(categories.map((el)=>Category.toResponse(el)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  })
);

export default router;