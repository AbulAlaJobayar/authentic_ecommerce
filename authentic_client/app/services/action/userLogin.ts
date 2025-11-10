"use server";
import { redirect } from "next/navigation";
import { setAccessToken } from "./setAccessToken";

type TLoginInfo = {
  email: string;
  password: string;
};
const userLogin = async (data: TLoginInfo) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    console.log({res})
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
    console.log({user})
    if (!user.data.verifyAt) {
      redirect("/verify");
    }
    if (user.data.accessToken) {
      setAccessToken(user.data.accessToken, { redirect: "/dashboard" });
    }
    return user;
  } catch (error) {
    console.error("Error during user login:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
export default userLogin;
