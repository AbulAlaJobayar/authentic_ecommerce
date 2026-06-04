/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import ATSMultiSelect from "@/components/shared/Form/ATSMultiSelect";
import ATSSelect from "@/components/shared/Form/ATSSelect";

import { Button } from "@/components/ui/button";
import DotWave from "@/components/ui/dot-wave";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";



import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";
import { useCreateDiscountMutation } from "@/redux/api/discountApi";
import { useGetAllProductsQuery } from "@/redux/api/productApi";

// ======================================================
// ENUM (adjust import from prisma if needed)
// ======================================================

export const DiscountType = {
    ALL_PRODUCTS: "ALL_PRODUCTS",
    SPECIFIC_PRODUCTS: "SPECIFIC_PRODUCTS",
    CATEGORIES: "CATEGORIES",
} as const;

// ======================================================
// ZOD SCHEMA
// ======================================================

const FormSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),

    image: z.string().trim().optional(),

    code: z.string().trim().optional(),

    productIds: z.array(z.string()).optional(),

    isDeleted: z.boolean().optional(),

    percentage: z.string().trim(),

    active: z.boolean().optional(),

    startDate: z.string(),

    endDate: z.string(),
});

type TFormValues = z.infer<typeof FormSchema>;

// ======================================================
// DEFAULT VALUES
// ======================================================

const defaultValues: TFormValues = {
    name: "",
    image: "",
    code: "",
    percentage:"",
    productIds: [],
    isDeleted: false,
    active: true,
    startDate: "",
    endDate: " ",
};

// ======================================================
// TYPES
// ======================================================

type TProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ======================================================
// COMPONENT
// ======================================================

const AddDiscount = ({ setOpen }: TProps) => {
    const [createDiscount, { isLoading, isError }] =
        useCreateDiscountMutation();
    const { data } = useGetAllProductsQuery({})
    const products = data?.data
    console.log(products, "add products")
    const handleSubmit = async (values: TFormValues) => {
        console.log(values, "form discount values");
        try {
            const res = await createDiscount(values);

            if (res?.data?.success) {
                toast.success(
                    res.data.message || "Discount created successfully"
                );

                setOpen(false);
            } else {
                toast.error(
                    (res?.error as any)?.data || "Failed to create discount"
                );

                setOpen(false);
            }
        } catch (error) {
            console.log(error);

            if (isError) {
                toast.error("Failed to create discount");
            } else if (error instanceof Error) {
                toast.error(error.message);
            }

            setOpen(false);
        }
    };

    return (
        <div>
            <ATSFrom
                resolver={zodResolver(FormSchema)}
                onSubmit={handleSubmit}
                defaultValues={defaultValues}
                className="p-6 md:p-8"
            >
                <FieldGroup>

                    {/* NAME */}
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <ATSInput name="name" placeholder="Eid Discount" />
                    </Field>

                    {/* IMAGE */}
                    <Field>
                        <FieldLabel>Image URL</FieldLabel>
                        <ATSInput name="image" placeholder="https://..." />
                    </Field>

                    {/* CODE */}
                    <Field>
                        <FieldLabel>Coupon Code</FieldLabel>
                        <ATSInput name="code" placeholder="EID10" />
                    </Field>

                    {/* PERCENTAGE */}
                    <Field>
                        <FieldLabel>Percentage</FieldLabel>
                        <ATSInput
                            name="percentage"
                            type="number"
                            placeholder="10"
                        />
                    </Field>



                    {/* PRODUCTS */}
                    <Field>
                        <FieldLabel>Products</FieldLabel>

                        <ATSMultiSelect
                            name="productIds"
                            options={products}
                        />
                    </Field>

                    {/* START DATE */}
                    <Field>
                        <FieldLabel>Start Date</FieldLabel>
                        <ATSInput name="startDate" type="date" />
                    </Field>

                    {/* END DATE */}
                    <Field>
                        <FieldLabel>End Date</FieldLabel>
                        <ATSInput name="endDate" type="date" />
                    </Field>

                    {/* SUBMIT */}
                    <Field>
                        <Button
                            className="bg-[#6777EF] hover:bg-[#4C60DA]"
                            type="submit"
                        >
                            {isLoading ? (
                                <span>
                                    Creating <DotWave />
                                </span>
                            ) : (
                                "Create Discount"
                            )}
                        </Button>
                    </Field>

                </FieldGroup>
            </ATSFrom>
        </div>
    );
};

export default AddDiscount;