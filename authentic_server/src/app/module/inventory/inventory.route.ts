import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { InventoryController } from './inventory.controller';

const router = Router();
router.get(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  InventoryController.getProductFromDB
);

export const InventoryRouter=router