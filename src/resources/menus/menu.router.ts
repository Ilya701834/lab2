import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import Menu from './menu.model';
import Category from '../categorys/category.model';

import menusService from './menu.service';
import catchErrors from '../../common/catchErrors';

const router = Router({mergeParams: true})

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const menus = await menusService.getAll();

    res.json(menus.map(Menu.toResponse));
  })
);

router.route('/:id/categories').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const categories = await menusService.getCategoryIdByMenuId(id || '');

    if (categories) {
      res.json(categories.map((el)=>Category.toResponse(el)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const {title, photo, isPublish} = req.body;

    const menu = await menusService.createMenu({title, photo, isPublish});

    if (menu) {
      res.status(StatusCodes.CREATED).json(Menu.toResponse(menu));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'MENU_NOT_CREATE', msg: 'Menu not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const menu = await menusService.getById(id || '');

    if (menu) {
      res.json(Menu.toResponse(menu));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {title, photo, isPublish} = req.body;

    const menu = await menusService.updateById({id:id || '' , title, photo, isPublish});

    if (menu) {
      res.status(StatusCodes.OK).json(Menu.toResponse(menu));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const menu = await menusService.deleteById(id || '');

    if (!menu) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'MENU_DELETED', msg: 'The menu has been deleted' });
  })
);

export default router;