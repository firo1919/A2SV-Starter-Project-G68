import * as z from "zod";

export const UserRegisterSchema = z
	.object({
		fullname: z
			.string()
			.min(1, "Full name is required")
			.refine((name) => name.trim().split(" ").length >= 2, {
				message: "Please enter your full name (at least two words)",
			}),
		email: z.email("Invalid email address"),
		password: z.string().min(5, "Password must be at least 5 characters"),
		confirmPassword: z.string(),
	})
	.refine((form) => form.confirmPassword === form.password, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
