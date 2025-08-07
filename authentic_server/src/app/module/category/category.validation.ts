import z from 'zod';

const createCategorySchemaValidation = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Name is Required' : ' Not a string',
      })
      .trim(),
  }),
});

export const categoryValidation = {
  createCategorySchemaValidation,
};
