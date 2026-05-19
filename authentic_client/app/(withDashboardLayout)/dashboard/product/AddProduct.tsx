"use client";

import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";

// ================= VALIDATION SCHEMA =================

const productSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is Required"
          : "Not a string",
    })
    .trim()
    .min(1, "Name is Required"),

  sku: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Sku is Required"
          : "Not a string",
    })
    .regex(
      /^[A-Z0-9]+$/,
      "SKU must contain only uppercase letters and numbers"
    )
    .trim(),

  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Description is Required"
          : "Not a string",
    })
    .trim(),

  categoryId: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "CategoryId is Required"
          : "Not a string",
    })
    .trim(),
});

const inventorySchemaValidation = z.object({
  alertQuantity: z.coerce.number(),
});

const productBatchSchemaValidation = z.object({
  batchNumber: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Batch Number is Required"
          : "Not a string",
    })
    .regex(
      /^BATCH-\d{4}-\d{2}$/,
      "batchNumber format: BATCH-YYYY-MM"
    )
    .trim(),

  expiryDate: z.string(),

  quantity: z.coerce.number(),

  buyingPrice: z.coerce.number(),

  costPrice: z.coerce.number(),

  sellingPrice: z.coerce.number(),

  shelfCode: z
    .string()
    .regex(
      /^S-\d{2}[A-Z]$/,
      "Shelf Code format: S-01A"
    ),

  rackCode: z
    .string()
    .regex(/^R-\d{2}$/, "Rack Code format: R-01"),

  supplierId: z.string(),

  warehouseId: z.string(),
});

const FormSchema = z.object({
    
  product: productSchemaValidation,
  inventory: inventorySchemaValidation,
  productBatch: productBatchSchemaValidation,
});

type TFormValues = z.input<typeof FormSchema>;

// ================= DEFAULT VALUES =================

const defaultValues: TFormValues = {
  product: {
    name: "",
    sku: "",
    description: "",
    categoryId: "",
  },

  inventory: {
    alertQuantity: 0,
  },

  productBatch: {
    batchNumber: "",
    expiryDate: "",
    quantity: 0,
    buyingPrice: 0,
    costPrice: 0,
    sellingPrice: 0,
    shelfCode: "",
    rackCode: "",
    supplierId: "",
    warehouseId: "",
  },
};

// ================= COMPONENT =================

const AddProduct = () => {
  const handleSubmit = (data: TFormValues) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ATSFrom
        resolver={zodResolver(FormSchema)}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="p-6 md:p-8"
      >
        <FieldGroup className="space-y-6">

          {/* PRODUCT INFO */}

          <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <ATSInput
                name="product.name"
                id="name"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="sku">SKU</FieldLabel>
              <ATSInput
                name="product.sku"
                id="sku"
                type="text"
                placeholder="ABC123"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">
                Description
              </FieldLabel>
              <ATSInput
                name="product.description"
                id="description"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="categoryId">
                Category ID
              </FieldLabel>
              <ATSInput
                name="product.categoryId"
                id="categoryId"
                type="text"
                required
              />
            </Field>
          </Field>

          {/* INVENTORY */}

          <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="alertQuantity">
                Alert Quantity
              </FieldLabel>
              <ATSInput
                name="inventory.alertQuantity"
                id="alertQuantity"
                type="number"
                required
              />
            </Field>
          </Field>

          {/* PRODUCT BATCH */}

          <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Field>
              <FieldLabel htmlFor="batchNumber">
                Batch Number
              </FieldLabel>
              <ATSInput
                name="productBatch.batchNumber"
                id="batchNumber"
                placeholder="BATCH-2026-05"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="expiryDate">
                Expiry Date
              </FieldLabel>
              <ATSInput
                name="productBatch.expiryDate"
                id="expiryDate"
                type="date"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="quantity">
                Quantity
              </FieldLabel>
              <ATSInput
                name="productBatch.quantity"
                id="quantity"
                type="number"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="buyingPrice">
                Buying Price
              </FieldLabel>
              <ATSInput
                name="productBatch.buyingPrice"
                id="buyingPrice"
                type="number"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="costPrice">
                Cost Price
              </FieldLabel>
              <ATSInput
                name="productBatch.costPrice"
                id="costPrice"
                type="number"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="sellingPrice">
                Selling Price
              </FieldLabel>
              <ATSInput
                name="productBatch.sellingPrice"
                id="sellingPrice"
                type="number"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="shelfCode">
                Shelf Code
              </FieldLabel>
              <ATSInput
                name="productBatch.shelfCode"
                id="shelfCode"
                placeholder="S-01A"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="rackCode">
                Rack Code
              </FieldLabel>
              <ATSInput
                name="productBatch.rackCode"
                id="rackCode"
                placeholder="R-01"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="supplierId">
                Supplier ID
              </FieldLabel>
              <ATSInput
                name="productBatch.supplierId"
                id="supplierId"
                type="text"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="warehouseId">
                Warehouse ID
              </FieldLabel>
              <ATSInput
                name="productBatch.warehouseId"
                id="warehouseId"
                type="text"
                required
              />
            </Field>
          </Field>

          {/* SUBMIT BUTTON */}

          <Field>
            <Button type="submit">
              Create Product
            </Button>
          </Field>

        </FieldGroup>
      </ATSFrom>
    </div>
  );
};

export default AddProduct;