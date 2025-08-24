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
exports.UserValidation = void 0;
const z = __importStar(require("zod"));
const prisma_1 = require("../../../../generated/prisma");
const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
})
    .refine((val) => /[a-z]/.test(val), {
    message: 'Password must contain at least one lowercase letter',
})
    .refine((val) => /[0-9]/.test(val), {
    message: 'Password must contain at least one number',
})
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: 'Password must contain at least one special character',
})
    .trim();
const phoneNumberSchema = z
    .string()
    .min(10, { message: 'Phone number too short' })
    .max(20, { message: 'Phone number too long' })
    .refine((val) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val), {
    message: 'Invalid phone number format. use country code',
});
const createUserSchemaValidation = z.object({
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
            .trim(),
        password: passwordSchema,
        mobile: phoneNumberSchema,
        role: z
            .enum(prisma_1.Role)
            .refine((val) => ['SUPER_ADMIN', 'MANAGER', 'CUSTOMER', 'STAFF'].includes(val), {
            message: 'Invalid role. Must be MANAGER, CUSTOMER, or STAFF.',
        })
            .optional(),
    }),
});
const updateValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
            error: (issue) => issue.input === undefined ? 'Name is Required' : ' Not a string',
        })
            .trim()
            .optional(),
        customId: z.string().optional(),
        mobile: phoneNumberSchema.optional(),
        email: z
            .email({
            error: (issue) => issue.input === undefined
                ? 'email is Required'
                : ' Provide valid email',
        })
            .trim()
            .optional(),
        role: z.enum(prisma_1.Role).optional(),
        verifiedAt: z.boolean().optional(),
        isDeleted: z.boolean().optional(),
        accountStatus: z.enum(prisma_1.accountStatus).optional(),
    }),
});
exports.UserValidation = {
    createUserSchemaValidation,
    updateValidationSchema,
};
