import { Router } from 'express';
import auth from '../../middleware/auth';
import { DiscountController } from './discount.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { DiscountValidation } from './discount.validation';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  validateRequest(DiscountValidation.createDiscountSchema),
  DiscountController.createDiscountIntoDB,
);
router.get('/', DiscountController.getAllDiscountFromDB);
router.get('/:id', DiscountController.getSingleDiscountFromDB);
router.patch(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  validateRequest(DiscountValidation.updateDiscountSchema),
  DiscountController.updateDiscountFromDB,
);
router.delete(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  DiscountController.deleteDiscountFromDB,
);

export const DiscountRouter = router;
