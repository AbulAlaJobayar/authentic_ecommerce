import * as z from 'zod';
import { Role } from '../../../../generated/prisma';

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
        error: (issue) =>
          issue.input === undefined ? 'Name is Required' : ' Not a string',
      })
      .trim(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? 'email is Required'
            : ' Provide valid email',
      })
      .trim(),
    password: passwordSchema,
    mobile: phoneNumberSchema,
    role: z
      .enum(Role)
      .refine(
        (val) => ['SUPER_ADMIN', 'MANAGER', 'CUSTOMER', 'STAFF'].includes(val),
        {
          message: 'Invalid role. Must be MANAGER, CUSTOMER, or STAFF.',
        }
      )
      .optional(),
  }),
});
export const UserValidation = {
  createUserSchemaValidation,
};
