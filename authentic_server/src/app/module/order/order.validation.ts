import { z } from 'zod';
import { PaymentMethod, PaymentStatus } from '../../../../generated/prisma';
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
    payment: z.object({
      method: z.enum(PaymentMethod),
      transactionId: z.string(),
      paymentStatus: z.enum(PaymentStatus),
      amount: z.number().nonnegative(),
    }),
  }),
});

export const OrderValidation = {
  createOrderIntoDB,
};
