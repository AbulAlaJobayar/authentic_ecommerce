import { Router } from 'express';
import { WarehouseController } from './warehose.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { WarehouseValidation } from './warehouse.interface';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  validateRequest(WarehouseValidation.createWarehouseSchema),
  WarehouseController.createWarehouseIntoDB
);
router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  WarehouseController.getWarehouseIntoDB
);
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  WarehouseController.updateWarehouseIntoDB
);
router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  WarehouseController.deleteWarehouseIntoDB
);

export const WarehouseRouter = router;
