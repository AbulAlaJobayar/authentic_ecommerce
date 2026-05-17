"use client"
import ATSFrom from '@/components/shared/Form/ATSForm';
import ATSInput from '@/components/shared/Form/ATSInput';
import { Button } from '@/components/ui/button';
import DotWave from '@/components/ui/dot-wave';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useCreateSuppliersMutation } from '@/redux/api/suppliers';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';

import z from 'zod';

const FormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),

    address: z.string().min(10, "Address must be at least 10 characters long"),

});
type TFormValues = z.infer<typeof FormSchema>
const defaultValue = {
    name: "",
    email: "",
    phone: "",
    address: "",
}
type TProps = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddSuppliers = ({ setOpen }: TProps) => {
    const [createSuppliers, { isLoading, isError, }] = useCreateSuppliersMutation()
    const handleSubmit = async (values: TFormValues) => {
        try {
            const res = await createSuppliers(values)
            console.log(res, "response from create suppliers")
            if (res && res?.data?.success) {
                toast.success(res?.data?.message || "Suppliers created successfully", {
                    description: res?.data?.message,
                });
                setOpen(false);
            }
            else {
                toast.error(((res?.error as { data: string })?.data) || "Failed to create suppliers");
                setOpen(false)
            }
        } catch (error) {

            console.log(error, "from error")
            if (isError) {
                toast.error("Failed to create suppliers");
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
                        <ATSInput name="name" id="name" type="text" placeholder='Authentic Surgical' required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <ATSInput name="email" id="email" type="email" placeholder='example@gmail.com' required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <ATSInput name="phone" id="phone" type="tel" placeholder='+8801712345678' required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <ATSInput name="address" id="address" type='text' placeholder='Holding 23, Khan Jahan Ali Road, Sonadanga, Khulna-9100
                Bangladesh' required />
                    </Field>

                    <Field>
                        <Button className='bg-[#6777EF] hover:bg-[#4C60DA]' type="submit">{isLoading ? <span>Adding <DotWave /></span> : "Add Suppliers"}</Button>
                    </Field>
                </FieldGroup>
            </ATSFrom>
         
        </div >

    );
};

export default AddSuppliers;