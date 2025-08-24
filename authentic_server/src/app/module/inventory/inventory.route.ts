import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { InventoryController } from './inventory.controller';
import validateRequest from '../../middleware/validateRequest';
import { InventoryValidation } from './inventory.validation';

const router = Router();
router.get(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  InventoryController.getAllInventoryFromDB
);
router.get(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  InventoryController.getSingleInventoryFromDB
);
router.patch(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  validateRequest(InventoryValidation.updateProductSchema),
  InventoryController.updateInventoryFromDB
);
router.delete(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  InventoryController.deleteInventoryFromDB
);

export const InventoryRouter = router;
