import * as z from "zod";

export const UserLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 6 characters"),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
