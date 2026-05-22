"use client"
import ATSFrom from '@/components/shared/Form/ATSForm';
import ATSImageInput from '@/components/shared/Form/ATSImageInput';
import ATSInput from '@/components/shared/Form/ATSInput';
import ATSSelect from '@/components/shared/Form/ATSSelect';
import { Button } from '@/components/ui/button';
import DotWave from '@/components/ui/dot-wave';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSingleProductsQuery, useUpdateProductsMutation } from '@/redux/api/productApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';


const FormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Product Name is Required").optional(),
    sku: z
        .string()
        .min(1, "SKU is required").optional(),
    description: z
        .string()
        .optional(),

    image: z.any().optional(),

    status: z.enum(["DRAFT", "ACTIVE", "DISCONTINUED",],
        {
            message: "Status is required",
        }
    ).optional(),

    sellingPrice: z.string()
        .min(0, "Selling price must be greater than 0").optional(),
});
type TFormValues = z.infer<typeof FormSchema>

type TProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

const EditProduct = ({ setOpen, id }: TProps) => {
    const { data, isLoading } = useGetSingleProductsQuery(id);
    const [updateProduct, { isError, isLoading: isUpdating }] = useUpdateProductsMutation()
    console.log(data?.data, "product single query")
    const defaultValues = {
        name: data?.data?.name ? data?.data?.name : "",
        sku: data?.data?.sku ? data?.data?.sku : "",
        description: data?.data?.description ? data?.data?.description : "",
        image: data?.data?.image ? data?.data?.image : "",
        status: data?.data?.status ? data?.data?.status : "",
        sellingPrice: data?.data?.sellingPrice ? data?.data?.sellingPrice : "",
    }


    const handleSubmit = async (values: TFormValues) => {
        console.log(values,"from product edited values")
        try {

            const res = await updateProduct({
                id: data?.data?.id, data: {
                    ...values,
                    sellingPrice: Number(values.sellingPrice),
                }
            })
            console.log(res, "response from update Product")
            if (res && res?.data?.success) {
                toast.success(res?.data?.message || "Product updated successfully", {
                    description: res?.data?.message,
                });
                setOpen(false);
            }
            else {
                toast.error(res?.data?.message || "Failed to update Product");
                setOpen(false)
            }
        } catch (error) {
            if (isError) {
                toast.error("Failed to update Product");
                setOpen(false)
            } else if (error instanceof Error) {
                toast.error(error.message);
                setOpen(false)
            }
        }
    }

    if (isLoading) {
        return (
            <div>
                <div className="p-6 md:p-8">
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Image Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        {/* Button */}
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                {/* Right Image Preview Skeleton */}
                <div className="bg-muted relative hidden md:block">
                    {/* <Skeleton className="h-[200px] w-full rounded-md" /> */}
                </div>
            </div>
        )
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

                    {/* Product Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Product Name</FieldLabel>
                        <ATSInput
                            name="name"
                            id="name"
                            type="text"
                            placeholder='enter product name'

                        />
                    </Field>
                    {/* SKU */}
                    <Field>
                        <FieldLabel htmlFor="sku">SKU</FieldLabel>
                        <ATSInput
                            name="sku"
                            id="sku"
                            type="text"
                            placeholder="Enter SKU"
                        />
                    </Field>


                    {/* Description */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="description">
                            Description
                        </FieldLabel>

                        <ATSInput
                            name="description"
                            id="description"
                            placeholder="Write product description..."
                        />
                    </Field>

                    {/* Image */}
                    <Field>
                        <FieldLabel htmlFor="image">Image</FieldLabel>

                        <ATSImageInput
                            name="image"
                            id="image"
                        />
                    </Field>

                    {/* Status */}
                    <Field>
                        <FieldLabel htmlFor="status">Status</FieldLabel>

                        <ATSSelect
                            name="status"
                            options={[
                                {
                                    label: "Draft",
                                    value: "DRAFT",
                                },
                                {
                                    label: "Active",
                                    value: "ACTIVE",
                                },
                                {
                                    label: "Discontinued",
                                    value: "DISCONTINUED",
                                },
                            ]}
                        />
                    </Field>

                    {/* Selling Price */}
                    <Field>
                        <FieldLabel htmlFor="sellingPrice">
                            Selling Price
                        </FieldLabel>

                        <ATSInput
                            name="sellingPrice"
                            id="sellingPrice"
                            type="number"
                            placeholder="0.00"
                        />
                    </Field>

                    {/* Submit */}
                    <Field>
                        <Button
                            className="bg-[#6777EF] hover:bg-[#4C60DA]"
                            type="submit"
                        >
                            {isLoading ? (
                                <DotWave />
                            ) : isUpdating ? (
                                "Update Product"
                            ) : (
                                "Create Product"
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </ATSFrom>

        </div >

    );
};

export default EditProduct;