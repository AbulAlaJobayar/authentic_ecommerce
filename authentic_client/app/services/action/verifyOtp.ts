type TVerifyOTP = {
  data: {
    otp: string;
    token: string;
  };
};

const verifyOtp = async (data: TVerifyOTP) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.data),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("OTP verified successfully:", result);
      // Handle success (redirect, show message, etc.)
    } else {
      console.error("OTP verification failed");
      // Handle error
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
};
export default verifyOtp;
