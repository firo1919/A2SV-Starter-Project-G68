import * as z from "zod";

export const ResetPassSchema = z
	.object({
		password: z.string().min(5, "Password must be at least 5 characters"),
		confirmPassword: z.string(),
	})
	.refine((form) => form.confirmPassword === form.password, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type ResetPass = z.infer<typeof ResetPassSchema>;
