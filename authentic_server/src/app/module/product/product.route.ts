import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { imageUploader } from '../../shared/imageUpload';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { productSchema } from './productValidation';
import parseData from '../../middleware/parseData';
import { ProductController } from './product.moduler';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  imageUploader.upload.single('image'),
  parseData(),
  validateRequest(productSchema.createProductSchema),
  ProductController.createProductIntoDB
);
// router.get(
//   '/',
//   auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
//   CategoryController.getCategoryFromDB
// );
// router.patch(
//   '/:id',
//   auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
//   CategoryController.updateCategoryFromDB
// );
// router.delete(
//   '/:id',
//   auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
//   CategoryController.deleteCategoryFromDB
// );
export const ProductRouter = router;
