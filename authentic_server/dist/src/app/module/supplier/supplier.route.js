"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const supplier_validation_1 = require("./supplier.validation");
const supplier_controller_1 = require("./supplier.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.MANAGER, user_constant_1.USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(supplier_validation_1.SupplierValidation.createSupplierSchemaIntoDB), supplier_controller_1.SupplierController.createUserIntoDB);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.MANAGER, user_constant_1.USER_ROLE.SUPER_ADMIN), supplier_controller_1.SupplierController.getAllSupplierFromDB);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.MANAGER, user_constant_1.USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(supplier_validation_1.SupplierValidation.updateSupplierSchemaFromDB), supplier_controller_1.SupplierController.updateSupplierFromDB);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.MANAGER, user_constant_1.USER_ROLE.SUPER_ADMIN), supplier_controller_1.SupplierController.deleteSupplierFromDB);
exports.SupplierRouter = router;
