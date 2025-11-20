/* eslint-disable @typescript-eslint/no-explicit-any */
const forgotPassword = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/forget-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        cache: "no-cache",
      }
    );
    const data = await res.json(); // only once!

    if (!res.ok) {
      throw new Error(data.message || "Code sending failed. Please try again.");
    }

    // Expecting something like: { success: true, message: "...", data: {...} }
    if (!data.success) {
      throw new Error("Invalid response from the server.");
    }

    return data;
  } catch (error: any) {
    console.error("Forgot password error:", error.message);
    throw new Error(error.message || "Something went wrong.");
  }
};
export default forgotPassword;
