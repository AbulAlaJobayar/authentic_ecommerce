import z from 'zod';

const createWarehouseValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Name is Required' : ' Not a string',
      })
      .trim(),

    address: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'address is Required' : ' Not a string',
      })
      .trim(),
  }),
});
const updateWarehouseValidation = z.object({
  body: createWarehouseValidationSchema.shape.body.partial(),
});

export const WarehouseValidation = {
  createWarehouseValidationSchema,
  updateWarehouseValidation,
};
