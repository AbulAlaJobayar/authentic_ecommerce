"use client"
import ATSFrom from '@/components/shared/Form/ATSForm';
import ATSImageInput from '@/components/shared/Form/ATSImageInput';
import ATSInput from '@/components/shared/Form/ATSInput';
import ATSPhoneInput from '@/components/shared/Form/ATSPhoneInput';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import z from 'zod';

const passwordSchema = z
    .string()
    .min(8, "Must be at least 8 characters long")
    .refine((val) => /[A-Z]/.test(val), {
        message: "Must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
        message: "Must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
        message: "Must contain at least one number",
    })
    .refine((val) => /[@$!%*?&]/.test(val), {
        message: "Must contain at least one special character (@$!%*?&)",
    });

const FormSchema = z.object({
    name: z.string(),
    email: z.email(),
    mobile: z.string(),
    image: z
        .any(),
    password: passwordSchema,
});
type TFormValues = z.infer<typeof FormSchema>

const defaultValue = {
    name: "",
    email: "",
    mobile: "",
    image: "",
    password: "",
}

const handleSubmit = (data: TFormValues) => {
    console.log(data);
}
const Product = () => {
    return (
        <div>

            <ATSFrom resolver={zodResolver(FormSchema)} onSubmit={handleSubmit} defaultValues={defaultValue} className="p-6 md:p-8">
                <FieldGroup >
                    <Field>
                        <Field className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <ATSInput name="name" id="name" type="text" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <ATSInput
                                    placeholder="you@example.com"
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                />
                            </Field>

                        </Field>
                    </Field>
                    <Field>
                        <Field className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                <ATSPhoneInput name="mobile" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Image</FieldLabel>
                                <ATSImageInput name="image" id="image" required />


                            </Field>
                        </Field>
                    </Field>
                    <Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <ATSInput
                                name="password"
                                id="password"
                                type="password"
                                required
                            />
                            <FieldDescription className="mt-1 text-xs">
                                Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                            </FieldDescription>
                        </Field>
                    </Field>
                    <Field>
                        <Button type="submit">Create Account</Button>
                    </Field>
                    <FieldDescription className="text-center">
                        Already have an account? <Link href="signin">Sign in</Link>
                    </FieldDescription>
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

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div >
        // </div>
    );
};

export default Product;