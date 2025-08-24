"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseRouter = void 0;
const express_1 = require("express");
const warehose_controller_1 = require("./warehose.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const warehouse_validation_1 = require("./warehouse.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.MANAGER), (0, validateRequest_1.default)(warehouse_validation_1.WarehouseValidation.createWarehouseValidationSchema), warehose_controller_1.WarehouseController.createWarehouseIntoDB);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.MANAGER), warehose_controller_1.WarehouseController.getWarehouseFromDB);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.MANAGER), warehose_controller_1.WarehouseController.getSingleWarehouseFromDB);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.MANAGER), (0, validateRequest_1.default)(warehouse_validation_1.WarehouseValidation.updateWarehouseValidation), warehose_controller_1.WarehouseController.updateWarehouseFromDB);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.SUPER_ADMIN, user_constant_1.USER_ROLE.MANAGER), warehose_controller_1.WarehouseController.deleteWarehouseFromDB);
exports.WarehouseRouter = router;
