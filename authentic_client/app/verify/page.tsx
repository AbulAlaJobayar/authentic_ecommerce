import { OTPForm } from "@/app/verify/otp-form";
import { Suspense } from "react";
import OTPSkeleton from "./otp-skeleton";
const Verify = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-xs">
                <Suspense fallback={<OTPSkeleton />}>
                    <OTPForm />
                </Suspense>
            </div>
        </div>
    );
};

export default Verify;