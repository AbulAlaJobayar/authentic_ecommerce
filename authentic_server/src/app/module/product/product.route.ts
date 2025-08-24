import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { imageUploader } from '../../shared/imageUpload';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import { productSchema } from './product.validation';
import parseData from '../../middleware/parseData';
import { ProductController } from './product.controller';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  imageUploader.upload.single('image'),
  parseData(),
  validateRequest(productSchema.createProductSchema),
  ProductController.createProductIntoDB
);
router.get('/', ProductController.getProductFromDB);
router.get('/:id', ProductController.getSingleProductFromDB);
export const ProductRouter = router;
