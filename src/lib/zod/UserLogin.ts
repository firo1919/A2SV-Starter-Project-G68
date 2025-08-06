import * as z from "zod";

export const UserLoginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(5, "Password must be at least 5 characters"),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
