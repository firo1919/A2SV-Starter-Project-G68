import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
	student_id: z
		.string()
		.min(1, "ID Number is required")
		.min(3, "ID Number must be at least 3 characters")
		.max(20, "ID Number must be less than 20 characters")
		.regex(/^[A-Za-z0-9-\/]+$/, "ID Number can only contain letters, numbers, and hyphens and forward slashes"),
	school: z
		.string()
		.min(1, "School/University is required")
		.min(2, "School/University must be at least 2 characters")
		.max(100, "School/University must be less than 100 characters"),
	degreeProgram: z
		.string()
		.min(1, "Degree Program is required")
		.min(2, "Degree Program must be at least 2 characters")
		.max(100, "Degree Program must be less than 100 characters"),
	country: z
		.string()
		.min(1, "Country is required")
		.min(2, "Country must be at least 2 characters")
		.max(50, "Country must be less than 50 characters"),
});

// Coding Profiles Schema
export const codingProfilesSchema = z.object({
	codeforces_handle: z
		.string()
		.trim()
		.min(1, "Codeforces profile link is required")
		.regex(
			/^https:\/\/codeforces\.com\/profile\/[a-zA-Z0-9_-]+\/?$/,
			"Enter a valid Codeforces profile URL (e.g., https://codeforces.com/profile/your_handle)"
		),
	leetcode_handle: z
		.string()
		.trim()
		.min(1, "LeetCode profile link is required")
		.regex(
			/^https:\/\/leetcode\.com\/[a-zA-Z0-9_-]+\/?$/,
			"Enter a valid LeetCode profile URL (e.g., https://leetcode.com/your_handle)"
		),
});

// Essays & Resume Schema
export const essaysResumeSchema = z.object({
	essay_about_you: z
		.string()
		.min(1, "About yourself is required")
		.min(50, "About yourself must be at least 50 characters")
		.max(1000, "About yourself must be less than 1000 characters"),
	essay_why_a2sv: z
		.string()
		.min(1, "Why you want to join is required")
		.min(50, "Why you want to join must be at least 50 characters")
		.max(1000, "Why you want to join must be less than 1000 characters"),
	resume: z
		.any()
		.refine((file) => file instanceof FileList && file.length > 0, {
			message: "Resume file is required",
		})
		.transform((fileList) => fileList[0]),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type CodingProfilesFormData = z.infer<typeof codingProfilesSchema>;
export type EssaysResumeFormData = z.infer<typeof essaysResumeSchema>;
