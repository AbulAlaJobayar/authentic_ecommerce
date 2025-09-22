import { z } from 'zod';

const createOrderIntoDB = z.object({
  body: z.object({
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      })
    ),
    shippingCost: z.number().nonnegative(),
    discountId: z.string().optional(),
    shipment: z.object({
      origin: z.string(),
      destination: z.string(),
    }),
  }),
});

export const OrderValidation = {
  createOrderIntoDB,
};
