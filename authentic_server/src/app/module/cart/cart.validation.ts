import z from 'zod';

const createCartIntoDB = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number().min(1, 'Quantity must be at last 1'),
  }),
});

const updateMyCartFromDB = z.object({
  body: z.object({
    quantity: z.number().min(1, 'Quantity must be at last 1'),
  }),
});

export const CartValidation = {
  createCartIntoDB,
  updateMyCartFromDB,
};
