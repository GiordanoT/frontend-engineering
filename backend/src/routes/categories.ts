import {Router} from 'express';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from '../middlewares/id';
import CategoriesController from '../controllers/categories';

const router = Router();

router
    .route('/init')
    .get(CategoriesController.init)

router
    .route('/')
    .get(CategoriesController.getAll)

router
    .route('/:id')
    .get(IdMiddleware.validate, ExistenceMiddleware.category, CategoriesController.getOne)


export {router as CategoriesRouter};

