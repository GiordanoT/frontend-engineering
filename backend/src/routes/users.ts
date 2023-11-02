import {Router} from 'express';
import AuthMiddleware from '../middlewares/auth';
import UsersController from '../controllers/users';
import ExistenceMiddleware from '../middlewares/existence';
import IdMiddleware from "../middlewares/id";

const router = Router();

router
    .route('/')
    .get(AuthMiddleware.isAuthenticated, UsersController.getAll)

router
    .route('/:id')
    .get(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.user, UsersController.getOne)
    .patch(AuthMiddleware.isAuthenticated, IdMiddleware.validate, ExistenceMiddleware.user, UsersController.update)

export {router as UsersRouter};

