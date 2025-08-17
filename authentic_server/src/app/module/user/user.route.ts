import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
import { imageUploader } from '../../shared/imageUpload';
import parseData from '../../middleware/parseData';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = Router();
router.post(
  '/',
  imageUploader.upload.single('image'),
  parseData(),
  validateRequest(UserValidation.createUserSchemaValidation),
  userController.createUserIntoDB
);
router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  userController.getUserFromDB
);
router.get(
  '/me',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CUSTOMER,
    USER_ROLE.STAFF
  ),
  userController.getMeFromDB
);
router.patch(
  '/:id',
  imageUploader.upload.single('image'),
  auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.MANAGER),
  parseData(),
  userController.updateUserFromDB
);
router.delete(
  '/:id',
  auth(
    USER_ROLE.CUSTOMER,
    USER_ROLE.MANAGER,
    USER_ROLE.STAFF,
    USER_ROLE.SUPER_ADMIN
  ),
  userController.deleteUserFromDB
);

export const userRouter = router;
