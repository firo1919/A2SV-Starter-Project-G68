import * as z from "zod";

export const cycleSchema = z.object({
    name: z.string().min(1, "Enter a word, not a character!"),
    start_date: z.string(),
    end_date: z.string()
})

export type CreateCycle = z.infer<typeof cycleSchema>;