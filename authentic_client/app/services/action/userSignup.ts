"use server";

import { UserCreateData } from "@/app/interface";
import { redirect, RedirectType } from "next/navigation";

const userSignup = async (data: UserCreateData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
      cache: "no-cache",
    });
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        errorResponse.message || "Signup failed. Please try again."
      );
    }
    const user = await res.json();

    if (!user.success) {
      throw new Error("Invalid response from the server.");
    }

    // Handle unverified user - this will throw NEXT_REDIRECT
    if (!user.data.verifiedAt) {
      redirect("/verify", RedirectType.push);
    }

    return user;
  } catch (error) {
    if (typeof error === "object" && error !== null && "digest" in error) {
      const redirectError = error as { digest: string };
      if (redirectError.digest?.includes("NEXT_REDIRECT")) {
        throw error; // Re-throw the original redirect error
      }
    }

    console.error("Error during user login:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export default userSignup;
