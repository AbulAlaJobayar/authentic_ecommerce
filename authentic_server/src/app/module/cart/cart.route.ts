import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';

const router = Router();
router.post(
  '/',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CUSTOMER,
    USER_ROLE.STAFF
  ),
  validateRequest(CartValidation.createCartIntoDB),
  CartController.createCartIntoDB
);
router.get(
  '/',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CUSTOMER,
    USER_ROLE.STAFF
  ),
  CartController.getMyCartFromDB
);
router.get(
  '/:id',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CUSTOMER,
    USER_ROLE.STAFF
  ),
  CartController.getSingleCartFromDB
);
router.patch(
  '/:id',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CUSTOMER,
    USER_ROLE.STAFF
  ),
  validateRequest(CartValidation.updateMyCartFromDB),
  CartController.updateMyCartFromDB
);
router.delete(
  '/:id',
  auth(
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.CUSTOMER,
    USER_ROLE.STAFF
  ),
  CartController.deleteCartFromDB
);
export const CartRouter = router;
