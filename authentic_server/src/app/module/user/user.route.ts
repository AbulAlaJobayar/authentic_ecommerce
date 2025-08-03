import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
import { imageUploader } from '../../shared/imageUpload';

const router = Router();
router.post(
  '/',imageUploader.upload.single('image'),
  validateRequest(UserValidation.createUserSchemaValidation),
  userController.createUserIntoDB
);
router.get('/', userController.getUserFromDB);

export const userRouter = router;
