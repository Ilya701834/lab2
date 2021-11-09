const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Dish = require('./dish.model');

const dishesService = require('./dish.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const dishes = await dishesService.getAll();

    res.json(dishes.map(Dish.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const {categoryId, title, description, photo, isPublish, ingredients, price} = req.body;

    const dish = await dishesService.createDish({categoryId, title, description, photo, isPublish, ingredients, price});

    if (dish) {
      res.status(StatusCodes.CREATED).json(Dish.toResponse(dish));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'DISH_NOT_CREATE', msg: 'Dish not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const dish = await dishesService.getById(id);

    if (dish) {
      res.json(Dish.toResponse(dish));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const {categoryId, title, description, photo, isPublish, ingredients, price} = req.body;

    const dish = await dishesService.updateById({id, categoryId, title, description, photo, isPublish, ingredients, price});

    if (dish) {
      res.status(StatusCodes.OK).json(Dish.toResponse(dish));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const dish = await dishesService.deleteById(id);

    if (!dish) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'DISH_DELETED', msg: 'The dish has been deleted' });
  })
);

module.exports = router;