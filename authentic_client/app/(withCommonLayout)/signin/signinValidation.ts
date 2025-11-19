import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters long")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Must contain at least one lowercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Must contain at least one number",
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: "Must contain at least one special character (@$!%*?&)",
  });