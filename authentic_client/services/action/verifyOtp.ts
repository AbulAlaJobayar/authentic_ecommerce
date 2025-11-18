const verifyOtp = async (token: string, otp: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, token }),
      }
    );
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        errorResponse.message || "Verification failed. Please try again."
      );
    }

    const result = await res.json();
    if (!result.success) {
      throw new Error("Invalid response from the server.");
    }
    return result;
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
};
export default verifyOtp;
