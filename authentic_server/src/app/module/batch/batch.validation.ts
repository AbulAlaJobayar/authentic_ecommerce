import z from 'zod';
import moment from 'moment';
const createProductBatchSchemaValidation = z.object({
  body: z.object({
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
      .string()
      .refine((date) => moment(date, 'YYYY-MM-DD', true).isValid(), {
        message: 'Invalid date format, expected YYYY-MM-DD',
      })
      .transform((date) =>
        moment.utc(date, 'YYYY-MM-DD').toDate().toISOString()
      )
      .refine((isoDate) => moment(isoDate).isAfter(moment()), {
        message: 'Expiry date must be in the future',
      }),

    quantity: z.number({
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
    costPrice: z.number({
      error: (issue) =>
        issue.input === undefined ? 'base Cost is Required' : ' Not a Number',
    }), //purchase cost from supplier
    sellingPrice: z.number({
      error: (issue) =>
        issue.input === undefined
          ? 'sellingPrice is Required'
          : ' Not a Number',
    }),
    shelfCode: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'shelf code is Required'
            : ' Not a string',
      })
      .regex(
        /^S-\d{2}[A-Z]$/,
        'Shelf Code must follow format S-01A, S-02B, etc.'
      )
      .trim(),
    rackCode: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'shelf code is Required'
            : ' Not a string',
      })
      .regex(/^R-\d{2}$/, 'Rack Code must follow format R-01, R-02, etc.')
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

const updateProductPatchValidationSchema = z.object({
  body: z.object({
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
      .trim()
      .optional(),
    expiryDate: z
      .string()
      .refine((date) => moment(date, 'YYYY-MM-DD', true).isValid(), {
        message: 'Invalid date format, expected YYYY-MM-DD',
      })
      .transform((date) =>
        moment.utc(date, 'YYYY-MM-DD').toDate().toISOString()
      )
      .refine((isoDate) => moment(isoDate).isAfter(moment()), {
        message: 'Expiry date must be in the future',
      })
      .optional(),

    quantity: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? 'sellingPrice is Required'
            : ' Not a Number',
      })
      .optional(),
    buyingPrice: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? 'Buying Price is Required'
            : ' Not a Number',
      })
      .optional(),
    costPrice: z
      .number({
        error: (issue) =>
          issue.input === undefined ? 'base Cost is Required' : ' Not a Number',
      })
      .optional(), //purchase cost from supplier
    sellingPrice: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? 'sellingPrice is Required'
            : ' Not a Number',
      })
      .optional(),
    shelfCode: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'shelf code is Required'
            : ' Not a string',
      })
      .regex(
        /^S-\d{2}[A-Z]$/,
        'Shelf Code must follow format S-01A, S-02B, etc.'
      )
      .trim()
      .optional(),
    rackCode: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'shelf code is Required'
            : ' Not a string',
      })
      .regex(/^R-\d{2}$/, 'Rack Code must follow format R-01, R-02, etc.')
      .trim()
      .optional(),
    supplierId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'supplierId is Required'
            : ' Not a string',
      })
      .trim()
      .optional(),
    inventoryId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'inventoryId is Required'
            : ' Not a string',
      })
      .trim()
      .optional(),
    warehouseId: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'warehouseId is Required'
            : ' Not a string',
      })
      .trim()
      .optional(),
  }),
});

// const updateProductPatchValidationSchema = createProductBatchSchemaValidation
//   .partial()
//   .extend({
//     id: z.string(),
//   })
//   .partial();
export const ProductBatchValidation = {
  createProductBatchSchemaValidation,
  updateProductPatchValidationSchema,
};
