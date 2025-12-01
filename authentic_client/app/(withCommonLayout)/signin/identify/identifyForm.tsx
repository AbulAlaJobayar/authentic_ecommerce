/* eslint-disable react-hooks/set-state-in-effect */
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
import forgotPassword from "@/services/action/forgotPassword"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/localStorages"
import { countdown } from "@/constant/authKey"
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
    const [timeLeft, setTimeLeft] = useState(0); // seconds
    const [isRunning, setIsRunning] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const startCountdown = () => {
        const endTime = Date.now() + 5 * 60 * 1000; // 5 min in ms
        setToLocalStorage(countdown, String(endTime))
        setTimeLeft(5 * 60);
        setIsRunning(true);
        setButtonDisabled(true);
    };


    // RESTORE COUNTDOWN AFTER REFRESH

    useEffect(() => {
        const storedEnd = getFromLocalStorage(countdown);
        if (!storedEnd) return;

        const endTime = parseInt(storedEnd);
        const now = Date.now();

        const secondsLeft = Math.floor((endTime - now) / 1000);

        if (secondsLeft > 0) {
            setTimeLeft(secondsLeft);
            setIsRunning(true);
            setButtonDisabled(true);
        } else {
            removeFromLocalStorage(countdown);
        }
    }, []);

    // DECREASE TIMER EVERY SECOND
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);


    // RESET WHEN TIMER ENDS
    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            setButtonDisabled(false);
            removeFromLocalStorage(countdown)
        }
    }, [timeLeft, isRunning]);


    // FORMAT TIME mm:ss
    const formatTime = (t: number) => {
        const m = Math.floor(t / 60);
        const s = t % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    // FORM SUBMIT
    const handleSubmit = async (data: TVerify) => {
        // startcountDown

        try {
            const res = await forgotPassword(data.email)
            if (res?.success) {
                // Toast or UI update
                // startcountDown
                startCountdown()
                toast.success(res?.message || "OTP sent to your email!");
            }
        } catch (error) {
            console.log(error)
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
                            <Link href="/signin">
                                <ArrowLeft className="text-bold size-8 p-2 bg-blue-50 rounded-full cursor-pointer" />
                            </Link>
                        </motion.div>
                        <p className="font-semibold text-sm text-[]">Authentic Surgical</p>
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
                                <Button type="submit"
                                    disabled={buttonDisabled}
                                >

                                    <motion.div
                                        whileTap={{ scale: 0.80 }}

                                    >Send Code</motion.div>
                                </Button>
                                {buttonDisabled && (
                                    <div className="text-right">
                                        <p className="text-sm font-normal">Didn’t get the code? Resend in {formatTime(timeLeft)}</p>
                                    </div>
                                )}
                            </Field>
                        </FieldGroup>
                    </ATSFrom>
                </CardContent>
            </Card>
        </div>
    )
}
export default IdentifyForm