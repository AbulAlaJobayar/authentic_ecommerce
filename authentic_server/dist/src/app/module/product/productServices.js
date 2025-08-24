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
exports.ProductServices = void 0;
const imageUpload_1 = require("../../shared/imageUpload");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createProductIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let image = '';
    if (file) {
        image = yield imageUpload_1.imageUploader.uploadImageToS3(file);
    }
    const productData = {
        sku: payload.body.sku,
        name: payload.body.name,
        description: payload.body.description,
        image: image || 'no image found',
        sellingPrice: payload.body.sellingPrice,
        categoryId: payload.body.categoryId,
        inventoryId: payload.body.inventoryId,
    };
    // transaction Apply
    //TODO: fix transaction type any
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // create product
        const createProduct = yield transactionClient.product.create({
            data: productData,
        });
        // create Inventory
        const inventoryData = {
            productId: createProduct.id,
            alertQuantity: payload.body.alertQuantity, // low stock alert threshold
        };
        const createInventory = yield transactionClient.inventory.create({
            data: inventoryData,
        });
        const productBatchData = {
            inventoryId: createInventory.id,
            supplierId: payload.body.supplierId,
            warehouseId: payload.body.warehouseId,
            batchNumber: payload.body.batchNumber,
            expiryDate: payload.body.expiryDate,
            quantity: payload.body.quantity,
            buyingPrice: payload.body.buyingPrice,
            costPrice: payload.body.costPrice,
            sellingPrice: payload.body.sellingPrice,
            shelfCode: payload.body.shelfCode,
            rackCode: payload.body.rackCode,
        };
        const productBatch = yield transactionClient.productBatch.create({
            data: productBatchData,
        });
        // update Inventory quantity
        yield transactionClient.inventory.update({
            where: { id: createInventory.id },
            data: { quantity: productBatch.quantity },
        });
        return createProduct;
    }));
    return result;
});
//TODO: create pagination and filtering
const getAllProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.find();
    return result;
});
const updateProductFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    updateProductFromDB,
};
