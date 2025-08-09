import * as z from "zod";

export const userSchema = z.object({
        full_name: z
            .string()
            .min(1, "Full name is required")
            .refine((name) => name.trim().split(" ").length >= 2, {
                message: "Please enter your full name (at least two words)",
            }),
        email: z
            .string()
            .email("Invalid email address"),
        password: z.string().min(5, "Password must be at least 5 characters"),
        role: z.string()
        
        
})

export type CreateUser = z.infer<typeof userSchema>;