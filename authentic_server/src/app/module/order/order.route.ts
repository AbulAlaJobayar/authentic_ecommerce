import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';

const router = Router();
router.post(
  '/',
  auth(
    USER_ROLE.CUSTOMER,
    USER_ROLE.MANAGER,
    USER_ROLE.STAFF,
    USER_ROLE.SUPER_ADMIN
  ),
  validateRequest(OrderValidation.createOrderIntoDB),
  OrderController.createOrderIntoDB
);
router.get(
  '/orders',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  OrderController.getAllOrderFromDB
);
router.get(
  '/',
  auth(
    USER_ROLE.CUSTOMER,
    USER_ROLE.MANAGER,
    USER_ROLE.STAFF,
    USER_ROLE.SUPER_ADMIN
  ),
  OrderController.getOrderByUserIdFromDB
);
router.get(
  '/:id',
  auth(
    USER_ROLE.CUSTOMER,
    USER_ROLE.MANAGER,
    USER_ROLE.STAFF,
    USER_ROLE.SUPER_ADMIN
  ),
  OrderController.getSingleOrderFromDB
);
router.delete(
  '/:id',
  auth(
    USER_ROLE.CUSTOMER,
    USER_ROLE.MANAGER,
    USER_ROLE.STAFF,
    USER_ROLE.SUPER_ADMIN
  ),
  OrderController.deleteOrderFromDB
);
export const OrderRoutes = router;
