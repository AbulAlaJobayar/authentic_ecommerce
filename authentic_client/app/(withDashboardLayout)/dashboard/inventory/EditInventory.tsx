"use client";

import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import ATSSelect from "@/components/shared/Form/ATSSelect";
import { Button } from "@/components/ui/button";
import DotWave from "@/components/ui/dot-wave";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleInventoryQuery, useUpdateInventoryMutation } from "@/redux/api/inventory";



import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
    product: z.object({
        name: z.string().optional(),
        sku: z.string().optional(),
        description: z.string().optional(),
        status: z
            .enum(["ACTIVE", "DRAFT", "DISCONTINUED"])
            .optional(),
    }),

    inventory: z.object({
        alertQuantity: z.number().optional(),
    }),
});

type TFormValues = z.infer<typeof FormSchema>;

type TProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

const EditInventory = ({ setOpen, id }: TProps) => {
    const { data, isLoading } = useGetSingleInventoryQuery(id);

    const [updateInventory, { isError, isLoading: isUpdating }] =
        useUpdateInventoryMutation();

    const defaultValues: TFormValues = {
        product: {
            name: data?.data?.product?.name || "",
            sku: data?.data?.product?.sku || "",
            description: data?.data?.product?.description || "",
            status: data?.data?.product?.status || "ACTIVE",
        },

        inventory: {
            alertQuantity: data?.data?.alertQuantity || 0,
        },
    };

    const handleSubmit = async (values: TFormValues) => {
        try {
            const res = await updateInventory({
                id,
                data: values,
            });

            if (res && "data" in res && res.data?.success) {
                toast.success(
                    res.data?.message || "Inventory updated successfully"
                );

                setOpen(false);
            } else {
                toast.error("Failed to update inventory");
            }
        } catch (error) {
            if (isError) {
                toast.error("Failed to update inventory");
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 md:p-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <ATSFrom
                resolver={zodResolver(FormSchema)}
                onSubmit={handleSubmit}
                defaultValues={defaultValues}
                className="p-6 md:p-8"
            >
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="product.name">
                            Product Name
                        </FieldLabel>

                        <ATSInput
                            name="product.name"
                            id="product.name"
                            type="text"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="product.sku">
                            SKU
                        </FieldLabel>

                        <ATSInput
                            name="product.sku"
                            id="product.sku"
                            type="text"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="product.description">
                            Description
                        </FieldLabel>

                        <ATSInput
                            name="product.description"
                            id="product.description"
                            type="text"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="inventory.alertQuantity">
                            Alert Quantity
                        </FieldLabel>

                        <ATSInput
                            name="inventory.alertQuantity"
                            id="inventory.alertQuantity"
                            type="number"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="product.status">
                            Status
                        </FieldLabel>


                        <ATSSelect
                         name="product.status"
                            id="product.status"
                            options={[
                                { label: "Active", value: "ACTIVE" },
                                { label: "Draft", value: "DRAFT" },
                                { label: "Discontinued", value: "DISCONTINUED" },
                            ]}

                        />

                        {/* value: s.id,
                        <ATSInput
                            name="product.status"
                            id="product.status"
                            type="text"
                        /> */}
                    </Field>

                    <Field>
                        <Button
                            className="bg-[#6777EF] hover:bg-[#4C60DA]"
                            type="submit"
                        >
                            {isUpdating ? <DotWave /> : "Update Inventory"}
                        </Button>
                    </Field>
                </FieldGroup>
            </ATSFrom>
        </div>
    );
};

export default EditInventory;