"use client"
import ATSFrom from '@/components/shared/Form/ATSForm';
import ATSImageInput from '@/components/shared/Form/ATSImageInput';
import ATSInput from '@/components/shared/Form/ATSInput';
import { Button } from '@/components/ui/button';
import DotWave from '@/components/ui/dot-wave';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from '@/redux/api/categorieApi';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from 'sonner';
import z from 'zod';


const FormSchema = z.object({
    name: z.string().regex(/^[A-Z][a-zA-Z]*$/, "Name must start with a capital letter").optional(),
    image: z.any().optional(),
});
type TFormValues = z.infer<typeof FormSchema>

type TProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

const EditSuppliers = ({ setOpen, id }: TProps) => {
    const { data, isLoading } = useGetSingleCategoryQuery(id);
    const [updateCategory, { isError, isLoading: isUpdating }] = useUpdateCategoryMutation()
    console.log(data?.data)
    const defaultValue = {
        name: data?.data?.name ? data?.data?.name : "",
        image: data?.data?.image ? data?.data?.image : "",
    }


    const handleSubmit = async (values: TFormValues) => {
        try {

            const res = await updateCategory({ id: data?.data?.id, data: values })
            console.log(res, "response from update category")
            if (res && res?.data?.success) {
                toast.success(res?.data?.message || "Category updated successfully", {
                    description: res?.data?.message,
                });
                setOpen(false);
            }
            else {
                toast.error(res?.data?.message || "Failed to update category");
                setOpen(false)
            }
        } catch (error) {
            if (isError) {
                toast.error("Failed to update category");
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
            <ATSFrom resolver={zodResolver(FormSchema)} onSubmit={handleSubmit} defaultValues={defaultValue} className="p-6 md:p-8">
                <FieldGroup >
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <ATSInput name="name" id="name" type="text" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="image">Image</FieldLabel>
                        <ATSImageInput name="image" id="image" />
                    </Field>

                    <Field>
                        <Button className='bg-[#6777EF] hover:bg-[#4C60DA]' type="submit">{isUpdating ? <DotWave /> : "Update Category"}</Button>
                    </Field>
                </FieldGroup>
            </ATSFrom>
            <div className="bg-muted relative hidden md:block">
                <Image
                    src=""
                    alt="Image"
                    width={200}
                    height={200}
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div >

    );
};

export default EditSuppliers;