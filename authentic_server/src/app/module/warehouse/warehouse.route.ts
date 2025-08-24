import { Router } from 'express';
import { WarehouseController } from './warehose.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { WarehouseValidation } from './warehouse.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  validateRequest(WarehouseValidation.createWarehouseValidationSchema),
  WarehouseController.createWarehouseIntoDB
);
router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  WarehouseController.getWarehouseFromDB
);
router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  WarehouseController.getSingleWarehouseFromDB
);
router.patch(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  validateRequest(WarehouseValidation.updateWarehouseValidation),
  WarehouseController.updateWarehouseFromDB
);
router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER),
  WarehouseController.deleteWarehouseFromDB
);

export const WarehouseRouter = router;
