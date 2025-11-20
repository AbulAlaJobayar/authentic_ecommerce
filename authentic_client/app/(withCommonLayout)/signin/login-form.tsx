/* eslint-disable @typescript-eslint/no-explicit-any */
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
import userLogin from "@/services/action/userLogin";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/features/login/loginSlice";
import { useRouter } from "next/navigation";
import sendEmailToVerify from "@/services/action/sendEmailToverify";
import { storeUserInfo } from "@/services/action/authServices";
import { passwordSchema } from "./signinValidation";

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
  const dispatch = useDispatch()
  const router = useRouter()
  const handleSubmit = async (data: FormValues) => {
    try {
      const res = await userLogin(data);
      console.log(res)
      if (res?.data) {
        if (!res.data.verifyAt) {
          dispatch(setLogin(data))
          const emailVerify = await sendEmailToVerify({ token: res.data.accessToken })
          router.push(`/verify?token=${emailVerify.data}`)
          return;
        }
        if (res.data.accessToken) {
          storeUserInfo(res.data.accessToken)
          toast.success("Login successful!", {
            description: res.message,
            duration: 5000,
          });
          router.push("/dashboard")
        }
      } else {
        toast.error("Login failed try again", {
          description: res.message,
          duration: 5000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
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
                    href="/signin/identify"
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
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
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
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>
        and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
};
export default LoginForm;
