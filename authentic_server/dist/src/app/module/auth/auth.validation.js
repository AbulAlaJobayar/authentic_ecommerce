"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const passwordSchema = zod_1.default
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
const loginValidation = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .email({
            error: (issue) => issue.input === undefined
                ? 'email is Required'
                : ' Provide valid email',
        })
            .trim(),
        password: passwordSchema,
    }),
});
const sendEmailValidation = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string().trim().min(1, { message: 'User ID is required' }),
    }),
});
const changePasswordValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        oldPassword: passwordSchema,
        newPassword: passwordSchema,
    }),
});
const refreshTokenValidationSchema = zod_1.default.object({
    cookies: zod_1.default.object({
        refreshToken: zod_1.default.string().trim(),
    }),
});
const forgetPasswordValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        id: zod_1.default.string().trim(),
    }),
});
const resetPasswordValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        newPassword: passwordSchema,
    }),
});
exports.AuthValidation = {
    loginValidation,
    sendEmailValidation,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
