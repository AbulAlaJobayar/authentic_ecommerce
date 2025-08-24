"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createCategorySchemaValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            error: (issue) => issue.input === undefined ? 'Name is Required' : ' Not a string',
        })
            .trim(),
    }),
});
const updateCategorySchemaValidation = createCategorySchemaValidation.partial();
exports.categoryValidation = {
    createCategorySchemaValidation,
    updateCategorySchemaValidation
};
