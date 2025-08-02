import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';

const router = Router();
router.post(
  '/',
  validateRequest(UserValidation.createUserSchemaValidation),
  userController.createUserIntoDB
);
router.get('/', userController.getUserFromDB);

export const userRouter = router;
