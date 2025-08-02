import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';

const router = Router();
router.post(
  '/createUser',
  validateRequest(UserValidation.createUserSchemaValidation),
  userController.createUserIntoDB
);

export const userRouter = router;
