import * as z from 'zod';

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
      .trim().optional(),

    phone: phoneNumberSchema,
    address: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'address is Required' : 'Not a string',
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
        error: (issue) =>
          issue.input === undefined ? 'Name is Required' : ' Not a string',
      })
      .trim().optional(),
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? 'email is Required'
            : ' Provide valid email',
      })
      .trim().optional(),

    phone: phoneNumberSchema,
    address: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'address is Required' : 'Not a string',
      })
      .trim()
      .optional(),
  }),
});


export const SupplierValidation = {
  createSupplierSchemaIntoDB,
  updateSupplierSchemaFromDB
};
