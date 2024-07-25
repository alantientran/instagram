import { z } from "zod";

// have to export so that the function can be used in other files
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  //   username: z.string().min(2).max(50),
  username: z
    .string()
    .min(2, { message: "Username must at least be 2 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must at least be 8 characters" }),
});
