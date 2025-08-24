"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const imageUpload_1 = require("../../shared/imageUpload");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middleware/auth"));
const productValidation_1 = require("./productValidation");
const parseData_1 = __importDefault(require("../../middleware/parseData"));
const product_moduler_1 = require("./product.moduler");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.MANAGER, user_constant_1.USER_ROLE.SUPER_ADMIN), imageUpload_1.imageUploader.upload.single('image'), (0, parseData_1.default)(), (0, validateRequest_1.default)(productValidation_1.productSchema.createProductSchema), product_moduler_1.ProductController.createProductIntoDB);
// router.get(
//   '/',
//   auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
//   CategoryController.getCategoryFromDB
// );
// router.patch(
//   '/:id',
//   auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
//   CategoryController.updateCategoryFromDB
// );
// router.delete(
//   '/:id',
//   auth(USER_ROLE.MANAGER, USER_ROLE.SUPER_ADMIN),
//   CategoryController.deleteCategoryFromDB
// );
exports.ProductRouter = router;
