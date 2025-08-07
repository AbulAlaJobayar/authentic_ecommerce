import { Router } from 'express';
import auth from '../../middleware/auth';
import { categoryValidation } from './category.validation';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CategoryController } from './category.controller';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  validateRequest(categoryValidation.createCategorySchemaValidation),
  CategoryController.createCategoryIntoDB
);
router.get(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  CategoryController.getCategoryFromDB
);
router.patch(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  CategoryController.updateCategoryFromDB
);
router.delete(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  CategoryController.deleteCategoryFromDB
);
export const CategoryRouter = router;
