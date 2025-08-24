import z from 'zod';

const productSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Name is Required' : ' Not a string',
    })
    .trim(),
  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Sku is Required' : ' Not a string',
    })
    .regex(
      /^[A-Z0-9]+$/,
      'SKU must contain only uppercase letters, numbers, dashes'
    )
    .trim(),
  description: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'Description is Required' : ' Not a string',
    })
    .trim(),
  categoryId: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'categoryId is Required' : ' Not a string',
    })
    .trim(),
});

const inventorySchemaValidation = z.object({
  alertQuantity: z.number(),
});

const productBatchSchemaValidation = z.object({
  batchNumber: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? ' batchNumber is Required'
          : ' Not a string',
    })
    .regex(
      /^BATCH-\d{4}-\d{2}$/,
      'batchNumber must follow format: BATCH-YYYY-MM'
    )
    .trim(),
  expiryDate: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'expiryDate is Required' : ' Not a string',
    })
    .trim(),
  quantity: z.number({
    error: (issue) =>
      issue.input === undefined ? 'sellingPrice is Required' : ' Not a Number',
  }),
  buyingPrice: z.number({
    error: (issue) =>
      issue.input === undefined ? 'Buying Price is Required' : ' Not a Number',
  }),
  costPrice: z.number({
    error: (issue) =>
      issue.input === undefined ? 'base Cost is Required' : ' Not a Number',
  }), //purchase cost from supplier
  sellingPrice: z.number({
    error: (issue) =>
      issue.input === undefined ? 'sellingPrice is Required' : ' Not a Number',
  }),
  shelfCode: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'shelf code is Required' : ' Not a string',
    })
    .regex(/^S-\d{2}[A-Z]$/, 'Shelf Code must follow format S-01A, S-02B, etc.')
    .trim(),
  rackCode: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'shelf code is Required' : ' Not a string',
    })
    .regex(/^R-\d{2}$/, 'Rack Code must follow format R-01, R-02, etc.')
    .trim(),
  supplierId: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'supplierId is Required' : ' Not a string',
    })
    .trim(),
  warehouseId: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'warehouseId is Required' : ' Not a string',
    })
    .trim(),
});
const createProductSchema = z.object({
  body: z.object({
    product: productSchemaValidation,
    inventory: inventorySchemaValidation,
    productBatch: productBatchSchemaValidation,
  }),
});

const updateProductInterface = z.object({
  body: z.object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Name is Required' : ' Not a string',
      })
      .trim(),

    description: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'Description is Required'
            : ' Not a string',
      })
      .trim(),
    // TODO: SKU PATTER DEFINE

    sku: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Sku is Required' : ' Not a string',
      })
      .trim(),
    baseCost: z.number({
      error: (issue) =>
        issue.input === undefined ? 'base Cost is Required' : ' Not a Number',
    }), //purchase cost from supplier
    sellingPrice: z.number({
      error: (issue) =>
        issue.input === undefined
          ? 'sellingPrice is Required'
          : ' Not a Number',
    }),
    categoryId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'categoryId is Required'
            : ' Not a string',
      })
      .trim(),
    supplierId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'supplierId is Required'
            : ' Not a string',
      })
      .trim(),
    inventoryId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'inventoryId is Required'
            : ' Not a string',
      })
      .trim(),
    warehouseId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'warehouseId is Required'
            : ' Not a string',
      })
      .trim(),
  }),
});

// export type TProduct = z.infer<typeof createProductSchema>;
export const productSchema = {
  createProductSchema,
  updateProductInterface,
};
