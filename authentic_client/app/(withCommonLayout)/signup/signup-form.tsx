"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";
import Link from "next/link";
import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ATSPhoneInput from "@/components/shared/Form/ATSPhoneInput";
import ATSImageInput from "@/components/shared/Form/ATSImageInput";
import userSignup from "@/services/action/userSignup";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redix/features/login/loginSlice";

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
  mobile: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
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

const SignupForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const dispatch = useDispatch()
  const handleSubmit = async (data: TFormValues) => {
    try {
      const res = await userSignup(data)
      const loginData = {
        email: data.email,
        password: data.password
      }
      if (res.data) {
        toast.success("SignUp successful please check your Email!", {
          description: res.message,
          duration: 5000,
        });
        dispatch(setLogin(loginData))
      } else {
        toast.error("SignUp failed try again", {
          description: res.message,
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <ATSFrom resolver={zodResolver(FormSchema)} onSubmit={handleSubmit} defaultValues={defaultValue} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
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
                    {/* <ATSInput
                      id="image"
                      type="file"
                      name="image"
                      required
                    /> */}

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
              src="/login.svg"
              alt="Image"
              width={200}
              height={200}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};
export default SignupForm;
