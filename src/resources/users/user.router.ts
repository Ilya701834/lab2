import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import UserModel from './user.entity';
import usersService from './user.service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    res.status(StatusCodes.OK).json(users.map(UserModel.toResponse));
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);

    if (user) {
      res.status(StatusCodes.CREATED).json(UserModel.toResponse(user));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await usersService.getById(id || '');

    if (user) {
      res.json(UserModel.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await usersService.updateById(id!, req.body);

    if (user) {
      res.status(StatusCodes.OK).json(UserModel.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await usersService.deleteById(id || '');

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }

    res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'USER_DELETED', msg: 'The user has been deleted' });
  }),
);

export default router;