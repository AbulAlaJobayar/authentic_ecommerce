import z from 'zod';


// Discount validation schema
 

const discountSchemaValidation = z.object({
  name: z.string().trim().min(1, 'Name is required'),

  image: z.string().trim(),

  code: z.string().trim().optional(),

  productIds: z.array(z.string()).optional(),

  isDeleted: z.boolean().optional(),

  percentage: z.number().min(0).max(100).optional(),

  maxAmount: z.number().optional().nullable(),

  active: z.boolean().optional(),

  startDate: z.date(),

  endDate: z.date(),
});

const createDiscountSchema = z.object({
  body: discountSchemaValidation,
});

const updateDiscountSchema = z.object({
  body: discountSchemaValidation.partial(), // allow partial update
});

export type TCreateDiscount = z.infer<typeof discountSchemaValidation>;
export type TUpdateDiscount = Partial<z.infer<typeof discountSchemaValidation>>;
export const DiscountValidation = {
  createDiscountSchema,
  updateDiscountSchema,
};
