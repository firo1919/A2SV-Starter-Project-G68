import * as z from "zod";

export const ForgotPassSchema = z.object({
	email: z.email("Invalid email address"),
});

export type ForgotPass = z.infer<typeof ForgotPassSchema>;
