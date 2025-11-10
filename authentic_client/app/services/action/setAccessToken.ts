"use server";
import { authKey } from "@/app/constant/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SetAccessTokenOptions {
  redirect?: string;
  maxAge?: number;
}

export const setAccessToken = async (
  token: string,
  options?: SetAccessTokenOptions
) => {
  (await cookies()).set(authKey, token, {
    httpOnly: true, //  prevents JS access (protects against XSS)
    secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
    sameSite: "lax", // prevents CSRF in most cases
    path: "/",
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 1, // default 7 days
  });

  if (options?.redirect) {
    redirect(options.redirect);
  }
};
