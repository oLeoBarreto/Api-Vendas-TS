import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import CustomersController from '../controller/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.index);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.crete,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
