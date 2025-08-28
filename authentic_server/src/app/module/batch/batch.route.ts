import { USER_ROLE } from './../user/user.constant';
import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { ProductBatchValidation } from './batch.validation';
import { ProductBatchController } from './batch.controller';

const route = Router();

route.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  validateRequest(ProductBatchValidation.createProductBatchSchemaValidation),
  ProductBatchController.createProductBatchIntoDB
);
route.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  ProductBatchController.getAllProductBatchFromDB
);
route.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  ProductBatchController.getSingleProductBatchFromDB
);
route.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  validateRequest(ProductBatchValidation.updateProductPatchValidationSchema),
  ProductBatchController.updateProductBatchFromDB
);
route.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  ProductBatchController.deleteProductBatchFromDB
);

export const ProductBatchRouter = route;
