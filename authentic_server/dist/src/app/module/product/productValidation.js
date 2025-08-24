"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const createProductSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            error: (issue) => issue.input === undefined ? 'Name is Required' : ' Not a string',
        })
            .trim(),
        description: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'Description is Required'
                : ' Not a string',
        })
            .trim(),
        // TODO: SKU PATTER DEFINE
        sku: zod_1.default
            .string({
            error: (issue) => issue.input === undefined ? 'Sku is Required' : ' Not a string',
        })
            .trim(),
        baseCost: zod_1.default.number({
            error: (issue) => issue.input === undefined ? 'base Cost is Required' : ' Not a Number',
        }), //purchase cost from supplier
        sellingPrice: zod_1.default.number({
            error: (issue) => issue.input === undefined
                ? 'sellingPrice is Required'
                : ' Not a Number',
        }),
        buyingPrice: zod_1.default.number({
            error: (issue) => issue.input === undefined
                ? 'Buying Price is Required'
                : ' Not a Number',
        }),
        categoryId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'categoryId is Required'
                : ' Not a string',
        })
            .trim(),
        supplierId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'supplierId is Required'
                : ' Not a string',
        })
            .trim(),
        inventoryId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'inventoryId is Required'
                : ' Not a string',
        })
            .trim(),
        warehouseId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'warehouseId is Required'
                : ' Not a string',
        })
            .trim(),
        batchNumber: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? ' batchNumber is Required'
                : ' Not a string',
        })
            .trim(),
        expiryDate: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'expiryDate is Required'
                : ' Not a string',
        })
            .trim(),
        quantity: zod_1.default.number({
            error: (issue) => issue.input === undefined
                ? 'sellingPrice is Required'
                : ' Not a Number',
        }),
        alertQuantity: zod_1.default.number({
            error: (issue) => issue.input === undefined
                ? 'sellingPrice is Required'
                : ' Not a Number',
        }),
        costPrice: zod_1.default.number({
            error: (issue) => issue.input === undefined ? 'costPrice is Required' : ' Not a Number',
        }),
        shelfCode: zod_1.default
            .string({
        //error:(issue)=>issue.expected=='A-01-05'?'costPrice is Required' :'provide'
        })
            .trim(), // e.g. A-01-05
        rackCode: zod_1.default
            .string({
        //error:(issue)=>issue.expected=='A-01-05'?'costPrice is Required' :'provide'
        })
            .trim(), // e.g. R-07
    }),
});
const updateProductInterface = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            error: (issue) => issue.input === undefined ? 'Name is Required' : ' Not a string',
        })
            .trim(),
        description: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'Description is Required'
                : ' Not a string',
        })
            .trim(),
        // TODO: SKU PATTER DEFINE
        sku: zod_1.default
            .string({
            error: (issue) => issue.input === undefined ? 'Sku is Required' : ' Not a string',
        })
            .trim(),
        baseCost: zod_1.default.number({
            error: (issue) => issue.input === undefined ? 'base Cost is Required' : ' Not a Number',
        }), //purchase cost from supplier
        sellingPrice: zod_1.default.number({
            error: (issue) => issue.input === undefined
                ? 'sellingPrice is Required'
                : ' Not a Number',
        }),
        categoryId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'categoryId is Required'
                : ' Not a string',
        })
            .trim(),
        supplierId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'supplierId is Required'
                : ' Not a string',
        })
            .trim(),
        inventoryId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'inventoryId is Required'
                : ' Not a string',
        })
            .trim(),
        warehouseId: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? 'warehouseId is Required'
                : ' Not a string',
        })
            .trim(),
    }),
});
exports.productSchema = {
    createProductSchema,
    updateProductInterface,
};
