import { Router } from 'express';
import auth from '../../middleware/auth';
import { categoryValidation } from './category.validation';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CategoryController } from './category.controller';
// import { imageUploader } from '../../shared/imageUpload';
// import parseData from '../../middleware/parseData';

const router = Router();
router.post(
  '/',
  // imageUploader.upload.single('image'),
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  // parseData(),
  validateRequest(categoryValidation.createCategorySchemaValidation),
  CategoryController.createCategoryIntoDB,
);
router.get('/', CategoryController.getCategoryFromDB);
router.get('/:id', CategoryController.getSingleFromDB);
router.patch(
  '/:id',
  // imageUploader.upload.single('image'),
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  // parseData(),
  validateRequest(categoryValidation.updateCategorySchemaValidation),
  CategoryController.updateCategoryFromDB,
);
router.delete(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  CategoryController.deleteCategoryFromDB,
);
export const CategoryRouter = router;
