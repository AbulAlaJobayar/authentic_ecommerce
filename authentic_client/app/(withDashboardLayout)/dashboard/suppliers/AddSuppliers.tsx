"use client"
import ATSFrom from '@/components/shared/Form/ATSForm';
import ATSInput from '@/components/shared/Form/ATSInput';
import { Button } from '@/components/ui/button';
import DotWave from '@/components/ui/dot-wave';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useCreateWarehouseMutation } from '@/redux/api/warehouse';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from 'sonner';

import z from 'zod';

const FormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    address: z.string().min(10, "Address must be at least 10 characters long"),
});
type TFormValues = z.infer<typeof FormSchema>
const defaultValue = {
    name: "",
    address: "",
}
type TProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddSuppliers = ({ setOpen }: TProps) => {
    const [createWarehouse, { isLoading, isError, }] = useCreateWarehouseMutation()
    const handleSubmit = async (values: TFormValues) => {
        try {
            const res = await createWarehouse(values)
            console.log(res, "response from create warehouse")
            if (res && res?.data?.success) {
                toast.success(res?.data?.message || "Warehouse created successfully", {
                    description: res?.data?.message,
                });
                setOpen(false);
            }
            else {
                toast.error(((res?.error as { data: string })?.data) || "Failed to create warehouse");
                setOpen(false)
            }
        } catch (error) {

            console.log(error, "from error")
            if (isError) {
                toast.error("Failed to create warehouse");
                setOpen(false)
            } else if (error instanceof Error) {
                toast.error(error.message);
                setOpen(false)
            }
        }
    }
    return (
        <div>
            <ATSFrom resolver={zodResolver(FormSchema)} onSubmit={handleSubmit} defaultValues={defaultValue} className="p-6 md:p-8">
                <FieldGroup >
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <ATSInput name="name" id="name" type="text" placeholder='Barakah Warehouse' required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <ATSInput name="address" id="address" type='text' placeholder='Holding 23, Khan Jahan Ali Road, Sonadanga, Khulna-9100
                Bangladesh' required />
                    </Field>

                    <Field>
                        <Button className='bg-[#6777EF] hover:bg-[#4C60DA]' type="submit">{isLoading ? <span>Adding <DotWave /></span> : "Add Warehouse"}</Button>
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

export default AddSuppliers;