"use server";
type TEmailVerify = {
  token: string;
};

const sendEmailToVerify = async (data: TEmailVerify) => {
 console.log("from send email to verify",data)
    try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        errorResponse.message || "Verify failed. Please try again."
      );
    }

    const user = await res.json();

    if (!user.success) {
      throw new Error("Invalid response from the server.");
    }

    return user;
  } catch (error: unknown) {
    // Check if this is a NEXT_REDIRECT error - if so, re-throw it
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

export default sendEmailToVerify;
