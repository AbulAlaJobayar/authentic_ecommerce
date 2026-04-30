import { FieldValues } from "react-hook-form";
import { setAccessToken } from "./setAccessToken";

const userLogin = async (data: FieldValues) => {
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
      },
    );

    // Handle non-OK responses
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        errorResponse.message || "Login failed. Please try again.",
      );
    }

    const userInfo = await res.json();

    // Ensure the response has the expected structure
    if (!userInfo.data) {
      throw new Error("Invalid response from the server.");
    }

    // Handle case where user is already logged in
    console.log("token from user file", userInfo.data.accessToken);
    // Store the access token and redirect
    if (userInfo.data.accessToken) {
      setAccessToken(userInfo.data.accessToken);
    }
    console.log("userinfo", userInfo);
    return userInfo;
  } catch (error) {
    console.error("Error during user login:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred.",
    );
  }
};

export default userLogin;
