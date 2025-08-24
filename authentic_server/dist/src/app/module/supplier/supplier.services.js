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
exports.SupplierServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../error/AppError");
const prisma_1 = __importDefault(require("../../shared/prisma"));
// TODO: define Type for payload
const createSupplierIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplier.create({
        data: payload,
    });
    return result;
});
const getAllSupplierFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplier.findMany({
        where: { isDeleted: false },
    });
    return result;
});
const getSingleSupplierFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.supplier.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Supplier not found');
    }
    return result;
});
const updateSupplierFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSupplierExist = yield prisma_1.default.supplier.findFirst({
        where: { id },
    });
    if (!isSupplierExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Supplier Not Found');
    }
    if (isSupplierExist === null || isSupplierExist === void 0 ? void 0 : isSupplierExist.isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Supplier is deleted');
    }
    const result = yield prisma_1.default.supplier.update({
        where: { id: id },
        data: payload,
    });
    return result;
});
const deleteSupplierFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isSupplierExist = yield prisma_1.default.supplier.findFirst({
        where: { id },
    });
    if (!isSupplierExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Supplier Not Found');
    }
    if (isSupplierExist === null || isSupplierExist === void 0 ? void 0 : isSupplierExist.isDeleted) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Supplier is Already deleted');
    }
    yield prisma_1.default.supplier.update({
        where: { id },
        data: { isDeleted: true },
    });
    return null;
});
exports.SupplierServices = {
    createSupplierIntoDB,
    getAllSupplierFromDB,
    getSingleSupplierFromDB,
    updateSupplierFromDB,
    deleteSupplierFromDB,
};
