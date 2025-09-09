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
export const OrderRoutes = router;
