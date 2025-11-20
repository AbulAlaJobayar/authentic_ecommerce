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
const emailValidation = z.object({
    email: z.email()
})
type TVerify = {
    email: string
}
const defaultValue = {
    email: ""
}
const IdentifyForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const handleSubmit = (data: TVerify) => {
        console.log(data)
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
                            <Link href="/signin">
                                <ArrowLeft className="text-bold size-8 p-2 bg-blue-50 rounded-full cursor-pointer" />
                            </Link>
                        </motion.div>
                        <p>Authentic Surgical</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <CardTitle className="mb-2">Forgot Password?</CardTitle>
                        <CardDescription>
                            Enter your email to receive a reset link
                        </CardDescription>
                    </div>
                    <ATSFrom onSubmit={handleSubmit} defaultValues={defaultValue} resolver={zodResolver(emailValidation)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <ATSInput
                                    name="email"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">
                                    <motion.div
                                        whileTap={{ scale: 0.80 }}

                                    >Send Code</motion.div>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </ATSFrom>
                </CardContent>
            </Card>
        </div>
    )
}
export default IdentifyForm