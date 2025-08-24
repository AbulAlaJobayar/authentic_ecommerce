import z from 'zod';
import { Status } from '../../../../generated/prisma';

const productSchemaValidation = z
  .object({
    name: z.string().trim().optional(),
    sku: z
      .string()
      .regex(
        /^[A-Z0-9]+$/,
        'SKU must contain only uppercase letters, numbers, dashes'
      )
      .trim()
      .optional(),
    description: z.string().trim().optional(),
    status: z.enum(Status).optional(),
   
  })
  .optional();

const inventorySchemaValidation = z
  .object({
    alertQuantity: z.number().optional(),
  })
  .optional();

const updateProductSchema = z.object({
  body: z.object({
    product: productSchemaValidation,
    inventory: inventorySchemaValidation,
  }),
});



export const InventoryValidation={
    updateProductSchema
}

