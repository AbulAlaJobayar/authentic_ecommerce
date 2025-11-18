"use server";
import { redirect, RedirectType } from "next/navigation";
import { setAccessToken } from "./setAccessToken";

type TLoginInfo = {
  email: string;
  password: string;
};

const userLogin = async (data: TLoginInfo) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        errorResponse.message || "Login failed. Please try again."
      );
    }

    const user = await res.json();
    
    if (!user.success) {
      throw new Error("Invalid response from the server.");
    }

    // Handle unverified user - this will throw NEXT_REDIRECT
    if (!user.data.verifyAt) {
      redirect("/verify", RedirectType.push);
    }

    // Handle successful login with access token - this will throw NEXT_REDIRECT
    if (user.data.accessToken) {
      await setAccessToken(user.data.accessToken, { redirect: "/dashboard" });
    }

    return user;
  } catch (error: unknown) {
    // Check if this is a NEXT_REDIRECT error - if so, re-throw it
    if (typeof error === 'object' && error !== null && 'digest' in error) {
      const redirectError = error as { digest: string };
      if (redirectError.digest?.includes('NEXT_REDIRECT')) {
        throw error; // Re-throw the original redirect error
      }
    }
    
    console.error("Error during user login:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export default userLogin;