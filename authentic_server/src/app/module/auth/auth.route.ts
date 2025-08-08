import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthController.loinUser
);
router.post('/verify-email', AuthController.verifyUser);
router.post(
  '/send-email',
  validateRequest(AuthValidation.sendEmailValidation),
  AuthController.sendEmailVerification
);
router.post(
  '/change-password',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.STAFF,
    USER_ROLE.CUSTOMER
  ),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword
);

export const AuthRoute = router;
