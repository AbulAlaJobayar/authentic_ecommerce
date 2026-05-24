/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import ATSSelect from "@/components/shared/Form/ATSSelect";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useGetAllSuppliersQuery } from "@/redux/api/suppliers";
import { useAllWarehouseQuery } from "@/redux/api/warehouse";
// import { useCreateInventoryBatchMutation } from "@/redux/api/inventory";

import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import moment from "moment";
import { useCreateProductsMutation } from "@/redux/api/productApi";


// ================= VALIDATION =================

const batchSchema = z.object({
  batchNumber: z
    .string()
    .regex(/^LOT\d{6}$/, "Format: LOT######"),

  expiryDate: z.string().min(1, "Expiry date required"),

  quantity: z.coerce.number().min(1),

  buyingPrice: z.coerce.number().min(1),

  costPrice: z.coerce.number().min(1),

  sellingPrice: z.coerce.number().min(1),

  shelfCode: z.string().regex(/^S-\d{2}[A-Z]$/),

  rackCode: z.string().regex(/^R-\d{2}$/),

  supplierId: z.string().min(1),

  warehouseId: z.string().min(1),
});

type TBatchForm = z.infer<typeof batchSchema>;

// ================= DEFAULT =================

const defaultValues: TBatchForm = {
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
};
type param ={
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    data:any
}

// ================= COMPONENT =================

const AddBatch = ({setOpen, data}: param) => {
  const params = useParams();
  const inventoryId = params?.id as string;

  const { data: suppliers } = useGetAllSuppliersQuery({});
  const { data: warehouses } = useAllWarehouseQuery({});
  const [createBatch, { isLoading }] = useCreateProductsMutation();

  const handleSubmit = async (data: TBatchForm) => {
    const payload = {
      inventoryId,

      batchNumber: data.batchNumber,
      expiryDate: data.expiryDate
        ? moment(data.expiryDate).toISOString()
        : null,

      quantity: data.quantity,
      buyingPrice: data.buyingPrice,
      costPrice: data.costPrice,
      sellingPrice: data.sellingPrice,

      shelfCode: data.shelfCode,
      rackCode: data.rackCode,

      supplierId: data.supplierId,
      warehouseId: data.warehouseId,
    };

    try {
    setOpen(false)
    } catch (error) {
      console.log("Batch Create Error:", error);
    }
  };

  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Batch</h2>
        <p className="text-sm text-muted-foreground">
          Create stock batch for this inventory
        </p>
      </div>

      {/* FORM */}
      <ATSFrom
        resolver={zodResolver(batchSchema)}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <FieldGroup className="space-y-6">

          {/* ROW 1 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Batch Number</FieldLabel>
              <ATSInput name="batchNumber" placeholder="LOT123456" />
            </Field>

            <Field>
              <FieldLabel>Expiry Date</FieldLabel>
              <ATSInput name="expiryDate" type="date" />
            </Field>
          </div>

          {/* ROW 2 */}
          <div className="grid gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel>Quantity</FieldLabel>
              <ATSInput name="quantity" type="number" />
            </Field>

            <Field>
              <FieldLabel>Buying Price</FieldLabel>
              <ATSInput name="buyingPrice" type="number" />
            </Field>

            <Field>
              <FieldLabel>Selling Price</FieldLabel>
              <ATSInput name="sellingPrice" type="number" />
            </Field>
          </div>

          {/* ROW 3 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Cost Price</FieldLabel>
              <ATSInput name="costPrice" type="number" />
            </Field>

            <Field>
              <FieldLabel>Rack Code</FieldLabel>
              <ATSInput name="rackCode" placeholder="R-01" />
            </Field>
          </div>

          {/* ROW 4 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Shelf Code</FieldLabel>
              <ATSInput name="shelfCode" placeholder="S-01A" />
            </Field>

            <Field>
              <FieldLabel>Supplier</FieldLabel>
              <ATSSelect
                name="supplierId"
                label="Supplier"
                options={
                  suppliers?.data?.data?.map((s: any) => ({
                    label: s.name,
                    value: s.id,
                  })) || []
                }
              />
            </Field>
          </div>

          {/* ROW 5 */}
          <Field>
            <FieldLabel>Warehouse</FieldLabel>
            <ATSSelect
              name="warehouseId"
              label="Warehouse"
              options={
                warehouses?.data?.data?.map((w: any) => ({
                  label: w.name,
                  value: w.id,
                })) || []
              }
            />
          </Field>

        </FieldGroup>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" >
            {isLoading ? "Creating..." : "Create Batch"}
          </Button>
        </div>
      </ATSFrom>
    </div>
  );
};

export default AddBatch;