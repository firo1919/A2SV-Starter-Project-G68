import * as z from "zod";

export const AddReviewSchema = z.object({
	activity_check_notes: z.string().min(1, "Activity check notes are required"),
	resume_score: z.coerce
		.number()
		.min(0, "Resume score must be at least 0")
		.max(100, "Resume score must be at most 100"),
	essay_why_a2sv_score: z.coerce
		.number()
		.min(0, "Essay 'Why A2SV' score must be at least 0")
		.max(100, "Essay 'Why A2SV' score must be at most 100"),
	essay_about_you_score: z.coerce
		.number()
		.min(0, "Essay 'About You' score must be at least 0")
		.max(100, "Essay 'About You' score must be at most 100"),
	technical_interview_score: z.coerce
		.number()
		.min(0, "Technical interview score must be at least 0")
		.max(100, "Technical interview score must be at most 100"),
	behavioral_interview_score: z.coerce
		.number()
		.min(0, "Behavioral interview score must be at least 0")
		.max(100, "Behavioral interview score must be at most 100"),
	interview_notes: z.string().min(1, "Interview notes are required"),
});

export type ReviewSchema = z.infer<typeof AddReviewSchema>;
