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
exports.WarehouseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../error/AppError");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createWarehouseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isWarehouseExist = yield prisma_1.default.warehouse.findFirst({
        where: { name: payload.name, isDeleted: false },
    });
    if (isWarehouseExist) {
        throw new AppError_1.AppError(http_status_1.default.CONFLICT, 'Warehouse with this name already exists');
    }
    const result = yield prisma_1.default.warehouse.create({
        data: payload,
    });
    return result;
});
const getAllWarehouseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.warehouse.findMany({
        where: { isDeleted: false },
    });
    return result;
});
const getSingleWarehouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.warehouse.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Warehouse Not Found');
    }
    return result;
});
const updateWarehouseFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseIsExist = yield prisma_1.default.warehouse.findUnique({
        where: { id, isDeleted: false },
    });
    if (!warehouseIsExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Warehouse not found');
    }
    const result = yield prisma_1.default.warehouse.update({
        where: { id, isDeleted: false },
        data: payload,
    });
    return result;
});
const deleteWarehouseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseIsExist = yield prisma_1.default.warehouse.findUnique({
        where: { id, isDeleted: false },
    });
    if (!warehouseIsExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Warehouse not found');
    }
    yield prisma_1.default.warehouse.update({
        where: { id, isDeleted: false },
        data: { isDeleted: true },
    });
    return null;
});
exports.WarehouseServices = {
    createWarehouseIntoDB,
    getAllWarehouseFromDB,
    getSingleWarehouse,
    updateWarehouseFromDB,
    deleteWarehouseFromDB,
};
