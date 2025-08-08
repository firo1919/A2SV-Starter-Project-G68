import * as z from "zod";

export const cycleSchema = z.object({
    name: z.string().min(1, "Enter a word, not a character!"),
    start_date: z.date(),
    end_date: z.date()
})

export type CreateCycle = z.infer<typeof cycleSchema>;