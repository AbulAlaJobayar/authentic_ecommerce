import z from 'zod';
  
const createProductSchema = z.object({
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
    buyingPrice: z.number({
      error: (issue) =>
        issue.input === undefined
          ? 'Buying Price is Required'
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
    batchNumber: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? ' batchNumber is Required'
            : ' Not a string',
      })
      .trim(),
    expiryDate: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'expiryDate is Required'
            : ' Not a string',
      })
      .trim(),
    quantity: z.number({
      error: (issue) =>
        issue.input === undefined
          ? 'sellingPrice is Required'
          : ' Not a Number',
    }),
    alertQuantity: z.number({
      error: (issue) =>
        issue.input === undefined
          ? 'sellingPrice is Required'
          : ' Not a Number',
    }),
    costPrice: z.number({
      error: (issue) =>
        issue.input === undefined ? 'costPrice is Required' : ' Not a Number',
    }),
    shelfCode: z
      .string({
        //error:(issue)=>issue.expected=='A-01-05'?'costPrice is Required' :'provide'
      })
      .trim(), // e.g. A-01-05
    rackCode: z
      .string({
        //error:(issue)=>issue.expected=='A-01-05'?'costPrice is Required' :'provide'
      })
      .trim(), // e.g. R-07
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

export type TProduct = z.infer<typeof createProductSchema>;
export const productSchema = {
  createProductSchema,
  updateProductInterface,
};
