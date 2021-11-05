const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const Category = require('./category.model');

const categoriesService = require('./category.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const categories = await categoriesService.getAll();

    res.json(categories.map(Category.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const {title, photo, isVisible} = req.body;

    const category = await categoriesService.createCategory({title, photo, isVisible});

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
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const category = await categoriesService.getById(id);

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
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const {title, photo, isVisible} = req.body;

    const category = await categoriesService.updateById({id, title, photo, isVisible});

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
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const category = await categoriesService.deleteById(id);

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

module.exports = router;