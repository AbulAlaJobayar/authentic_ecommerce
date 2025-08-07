import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { SupplierValidation } from './supplier.validation';
import { SupplierController } from './supplier.controller';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  validateRequest(SupplierValidation.createSupplierSchemaIntoDB),
  SupplierController.createUserIntoDB
);
router.get(
  '/',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  SupplierController.getAllSupplierFromDB
);
router.patch(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  validateRequest(SupplierValidation.updateSupplierSchemaFromDB),
  SupplierController.updateSupplierFromDB
);
router.delete(
  '/:id',
  auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
  SupplierController.deleteSupplierFromDB
);

export const SupplierRouter = router;
