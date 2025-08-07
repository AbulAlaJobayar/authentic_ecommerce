import z from 'zod';

const createWarehouseSchema = z.object({
  data: z.object({
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

export const WarehouseValidation={
    createWarehouseSchema
}
