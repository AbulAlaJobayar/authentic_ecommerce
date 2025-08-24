"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../error/AppError");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const imageUpload_1 = require("../../shared/imageUpload");
const createCategoryIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let image = '';
    if (req.file) {
        const img = yield imageUpload_1.imageUploader.uploadImageToS3(req.file);
        image = img;
    }
    const payload = {
        name: req.body.name,
        image,
    };
    const result = yield prisma_1.default.category.create({ data: payload });
    return result;
});
const getAllCategoryFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany({
        where: { isDeleted: false },
    });
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUnique({
        where: { id, isDeleted: false },
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Category Not Found');
    }
    return result;
});
const updateCategoryFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryIsExist = yield prisma_1.default.category.findUnique({
        where: { id },
    });
    if (!categoryIsExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Category Not Found');
    }
    if (categoryIsExist.isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Category is Already deleted');
    }
    return yield prisma_1.default.category.update({
        where: { id },
        data: payload,
    });
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryIsExist = yield prisma_1.default.category.findUnique({
        where: { id },
    });
    if (!categoryIsExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Category NOT Found');
    }
    if (categoryIsExist.isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Category is Already deleted');
    }
    yield prisma_1.default.category.update({
        where: { id },
        data: { isDeleted: true },
    });
    return null;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoryFromDB,
    getSingleCategory,
    updateCategoryFromDB,
    deleteCategoryFromDB,
};
