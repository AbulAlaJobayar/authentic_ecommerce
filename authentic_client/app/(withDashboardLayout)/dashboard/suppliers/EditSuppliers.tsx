"use client"
import ATSFrom from '@/components/shared/Form/ATSForm';
import ATSInput from '@/components/shared/Form/ATSInput';
import { Button } from '@/components/ui/button';
import DotWave from '@/components/ui/dot-wave';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSingleSuppliersQuery, useUpdateSuppliersMutation } from '@/redux/api/suppliers';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';


const FormSchema = z.object({
    name: z.string().regex(/^[A-Z][a-zA-Z]*$/, "Name must start with a capital letter").optional(),
    email: z.email("Invalid email address").optional(),
    phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number").optional(),
    address: z.string().optional(),
});
type TFormValues = z.infer<typeof FormSchema>

type TProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

const EditSuppliers = ({ setOpen, id }: TProps) => {
    const { data, isLoading } = useGetSingleSuppliersQuery(id);
    const [updateSuppliers, { isError, isLoading: isUpdating }] = useUpdateSuppliersMutation()
    console.log(data?.data, "data from single suppliers")
    const defaultValue = {
        name: data?.data?.name ? data?.data?.name : "",
        email: data?.data?.email ? data?.data?.email : "",
        phone: data?.data?.phone ? data?.data?.phone : "",
        address: data?.data?.address ? data?.data?.address : "",
    }


    const handleSubmit = async (values: TFormValues) => {
        try {

            const res = await updateSuppliers({ id: data?.data?.id, data: values })
            console.log(res, "response from update suppliers")
            if (res && res?.data?.success) {
                toast.success(res?.data?.message || "Suppliers updated successfully", {
                    description: res?.data?.message,
                });
                setOpen(false);
            }
            else {
                toast.error(res?.data?.message || "Failed to update suppliers");
                setOpen(false)
            }
        } catch (error) {
            if (isError) {
                toast.error("Failed to update suppliers");
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
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                        {/* Phone Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                        {/* Address Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                        {/* Name Field */}
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
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <ATSInput name="email" id="email" type="email"  />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <ATSInput name="phone" id="phone" type="tel"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <ATSInput name="address" id="address" type='text' />
                    </Field>
                    <Field>
                        <Button className='bg-[#6777EF] hover:bg-[#4C60DA]' type="submit">{isUpdating ? <DotWave /> : "Update Suppliers"}</Button>
                    </Field>
                </FieldGroup>
            </ATSFrom>
        </div >

    );
};

export default EditSuppliers;