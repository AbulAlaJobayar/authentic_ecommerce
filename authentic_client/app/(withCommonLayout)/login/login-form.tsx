"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Link from "next/link";
import Image from "next/image";
import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
const formSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});
type FormValues = z.infer<typeof formSchema>;
const defaultValues: Partial<FormValues> = {
  email: "",
  password: "",
};
const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <ATSFrom
            className="p-6 md:p-8"
            resolver={zodResolver(formSchema)}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <ATSInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <ATSInput
                  id="password"
                  type="password"
                  name="password"
                  required
                />
              </Field>
              <Button
                type="submit"
                variant={"default"}
                className="bg-gray-950 hover:bg-gray-800 "
              >
                Login
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </ATSFrom>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login.svg"
              alt="Image"
              fill
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
export default LoginForm;
