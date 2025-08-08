import z from 'zod';

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

const loginValidation = z.object({
  body: z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? 'email is Required'
            : ' Provide valid email',
      })
      .trim(),
    password: passwordSchema,
  }),
});
const sendEmailValidation = z.object({
  body: z.object({
    id: z.string().trim().min(1, { message: 'User ID is required' }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().trim(),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string().trim(),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: passwordSchema,
  }),
});

export const AuthValidation = {
  loginValidation,
  sendEmailValidation,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
