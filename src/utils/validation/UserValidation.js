import { z } from "zod";

export const logInValidation = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }), // Ensure email format is valid
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});
