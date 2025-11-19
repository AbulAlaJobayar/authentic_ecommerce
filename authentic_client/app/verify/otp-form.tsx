/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ATSFrom from "@/components/shared/Form/ATSForm"
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import verifyOtp from "../../services/action/verifyOtp"
import userLogin from "@/services/action/userLogin"
import { useDispatch, useSelector } from "react-redux"
import { resetLogin } from "@/redux/features/login/loginSlice"
import { toast } from "sonner"
import { storeUserInfo } from "@/services/action/authServices"


export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [otp, setOtp] = useState("")
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { email, password } = useSelector((state: any) => state.loginInfo)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      // 1 verified user
      const result = await verifyOtp(token, otp)
      if (result.success) {

        // 2 user login
        const res = await userLogin({ email, password })
        if (res.data) {
          if (res.data.accessToken) {
            storeUserInfo(res.data.accessToken)
            toast.success("Login successful!", {
              description: res.message,
              duration: 5000,
            });

            dispatch(resetLogin())
            router.push("/")
          }
        } else {
          dispatch(resetLogin())
          toast.error("Login failed try again", {
            description: res.message,
            duration: 5000,
          });
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <ATSFrom onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp"
                required
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Button type="submit">Verify</Button>
              <FieldDescription className="text-center">
                Didn&apos;t receive the code? <button type="button" onClick={() => console.log("Resend OTP")}>Resend</button>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </ATSFrom>
      </CardContent>
    </Card>
  )
}