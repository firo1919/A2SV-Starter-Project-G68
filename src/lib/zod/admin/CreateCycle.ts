import * as z from "zod";

export const cycleSchema = z.object({
	name: z.string().min(1, "Enter a word, not a character!"),
	start_date: z.string().min(1, "Enter a word, not a character!"),
	end_date: z.string().min(1, "Enter a word, not a character!"),
	description: z.string().min(1, "Enter a word, not a character!"),
});

export type CreateCycle = z.infer<typeof cycleSchema>;
