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
import { useCreateBatchMutation } from "@/redux/api/batchApi";
import { toast } from "sonner";




// ================= VALIDATION =================

const batchSchema = z.object({
  batchNumber: z
    .string()
    .trim()
    .regex(
      /^LOT\d{6}$/,
      "Format: LOT######"
    ),

  expiryDate: z.string().min(1, "Expiry date required"),
  quantity: z.string()
    .min(1, "Quantity required"),
  buyingPrice: z.string()
    .min(1, "Buying price required"),
  costPrice: z
    .string()
    .min(1, "Cost price required"),
  sellingPrice: z.string()
    .min(1, "Selling price required"),
  shelfCode: z
    .string()
    .regex(
      /^S-\d{2}[A-Z]$/,
      "Format: S-01A"
    ),

  rackCode: z
    .string()
    .regex(/^R-\d{2}$/, "Format: R-01"),

  supplierId: z.string().min(1, "Supplier required"),

  warehouseId: z.string().min(1, "Warehouse required"),

})

type TBatchForm = z.infer<typeof batchSchema>;

// ================= DEFAULT =================

const defaultValues: TBatchForm = {
  batchNumber: "",
  expiryDate: "",
  quantity: "",
  buyingPrice: "",
  costPrice: "",
  sellingPrice: "",
  shelfCode: "",
  rackCode: "",
  supplierId: "",
  warehouseId: "",
};
type param = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

// ================= COMPONENT =================

const AddBatch = ({ setOpen }: param) => {

  const params = useParams();
  const inventoryId = params?.id as string;

  const { data: suppliers } = useGetAllSuppliersQuery({});
  const { data: warehouses } = useAllWarehouseQuery({});
  const [createBatch, { isLoading, isError }] = useCreateBatchMutation();

  const handleSubmit = async (data: TBatchForm) => {
    console.log(data)
    const payload = {
      inventoryId,
      batchNumber: data.batchNumber,
      expiryDate: data.expiryDate,
      quantity: Number(data.quantity),
      buyingPrice: Number(data.buyingPrice),
      costPrice: Number(data.costPrice),
      sellingPrice: Number(data.sellingPrice),

      shelfCode: data.shelfCode,
      rackCode: data.rackCode,

      supplierId: data.supplierId,
      warehouseId: data.warehouseId,
    };


    try {
      const res = await createBatch(payload)
      if (res && res?.data?.success) {
        toast.success(res?.data?.message || "Batch created successfully", {
          description: res?.data?.message,
        });
        setOpen(false);
      }
      else {
        toast.error(((res?.error as { data: string })?.data) || "Failed to create batch");
        setOpen(false)
      }
    } catch (error) {

      console.log(error, "from error")
      if (isError) {
        toast.error("Failed to create category");
        setOpen(false)
      } else if (error instanceof Error) {
        toast.error(error.message);
        setOpen(false)
      }
    }
  }

  return (
    <div>
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
              <ATSInput name="batchNumber" placeholder="LOT200526" />
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