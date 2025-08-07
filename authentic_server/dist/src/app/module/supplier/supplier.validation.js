"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierValidation = void 0;
const z = __importStar(require("zod"));
const phoneNumberSchema = z
    .string()
    .min(10, { message: 'Phone number too short' })
    .max(20, { message: 'Phone number too long' })
    .refine((val) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val), {
    message: 'Invalid phone number format. use country code',
})
    .optional();
const createSupplierSchemaIntoDB = z.object({
    body: z.object({
        name: z
            .string({
            error: (issue) => issue.input === undefined ? 'Name is Required' : ' Not a string',
        })
            .trim(),
        email: z
            .email({
            error: (issue) => issue.input === undefined
                ? 'email is Required'
                : ' Provide valid email',
        })
            .trim().optional(),
        phone: phoneNumberSchema,
        address: z
            .string({
            error: (issue) => issue.input === undefined ? 'address is Required' : 'Not a string',
        })
            .trim()
            .optional(),
    }),
});
// type supplier=z.infer<createSupplierSchemaIntoDB>
const updateSupplierSchemaFromDB = z.object({
    body: z.object({
        name: z
            .string({
            error: (issue) => issue.input === undefined ? 'Name is Required' : ' Not a string',
        })
            .trim().optional(),
        email: z
            .email({
            error: (issue) => issue.input === undefined
                ? 'email is Required'
                : ' Provide valid email',
        })
            .trim().optional(),
        phone: phoneNumberSchema,
        address: z
            .string({
            error: (issue) => issue.input === undefined ? 'address is Required' : 'Not a string',
        })
            .trim()
            .optional(),
    }),
});
exports.SupplierValidation = {
    createSupplierSchemaIntoDB,
    updateSupplierSchemaFromDB
};
