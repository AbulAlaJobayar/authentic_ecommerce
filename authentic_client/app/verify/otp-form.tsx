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
import { useState } from "react"

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [otp, setOtp] = useState("")

  const handleSubmit = (data: any) => {
    console.log("OTP submitted:", otp)
    console.log("Form data:", data)

    // Your OTP verification logic here
    verifyOtp(otp)
  }

  const verifyOtp = async (otpCode: string) => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('OTP verified successfully:', result)
        // Handle success (redirect, show message, etc.)
      } else {
        console.error('OTP verification failed')
        // Handle error
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
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