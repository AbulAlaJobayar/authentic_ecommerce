"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { ArrowLeft } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import ATSFrom from "@/components/shared/Form/ATSForm"
import ATSInput from "@/components/shared/Form/ATSInput"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import resetPassword from "@/services/action/resetPassword"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


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
const passwordValidation = z.object({
    password: passwordSchema
})
type TVerify = {
    password: string
}
const defaultValue = {
    password: "",
}

const ResetForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const searchParams = useSearchParams();
    const router = useRouter()
    const token = searchParams.get("token") as string;

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    // FORM SUBMIT
    const handleSubmit = async (data: TVerify) => {
        try {
            const res = await resetPassword({ token, newPassword: data.password })
            console.log("res from reset ", res)
            if (res?.success) {
                // Toast or UI update 
                toast.success(res?.message || "password reset successfully!");
                router.push("/signin")
            }
        } catch (error) {
            const err = error as Error
            setErrorMessage(err.message)
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <motion.div
                            whileTap={{ scale: 0.80 }}
                            whileHover={{ scale: 0.95 }}
                        >
                            <Link href="/signin/identify">
                                <ArrowLeft className="text-bold size-8 p-2 bg-blue-50 rounded-full cursor-pointer" />
                            </Link>
                        </motion.div>
                        <p className="font-semibold text-sm text-[]">Authentic Surgical</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <CardTitle className="mb-2">Reset your password here</CardTitle>
                        <CardDescription>
                            Choose a strong new password to keep your account safe.
                        </CardDescription>
                        <CardDescription>
                            {errorMessage && <motion.div
                                animate={{ x: [0, -10, 10, -10, 10, 0] }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    ease: "easeInOut"
                                }}
                                className="text-red-500 my-2 capitalize ">  {errorMessage === "jwt expired"
                                    ? "Your time expired. Please submit your Gmail again and reset your password."
                                    : errorMessage}</motion.div>}
                        </CardDescription>
                    </div>
                    <ATSFrom onSubmit={handleSubmit} defaultValues={defaultValue} resolver={zodResolver(passwordValidation)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="password">New Password</FieldLabel>
                                <ATSInput
                                    name="password"
                                    id="password"
                                    placeholder="Enter your new password"
                                    required
                                />
                                <FieldDescription className="mt-1 text-xs">
                                    Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit"
                                ><motion.div
                                    whileTap={{ scale: 0.80 }}

                                >Reset My Password</motion.div>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </ATSFrom>
                </CardContent>
            </Card>
        </div>
    )
}
export default ResetForm