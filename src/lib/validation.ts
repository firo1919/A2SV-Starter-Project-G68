import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
	idNumber: z
		.string()
		.min(1, "ID Number is required")
		.min(3, "ID Number must be at least 3 characters")
		.max(20, "ID Number must be less than 20 characters")
		.regex(/^[A-Za-z0-9-]+$/, "ID Number can only contain letters, numbers, and hyphens"),
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
});

// Coding Profiles Schema
export const codingProfilesSchema = z.object({
	codeforces: z
		.string()
		.min(1, "Codeforces username is required")
		.min(3, "Codeforces username must be at least 3 characters")
		.max(30, "Codeforces username must be less than 30 characters")
		.regex(/^[A-Za-z0-9_.]+$/, "Codeforces username can only contain letters, numbers, dots, and underscores"),
	leetcode: z
		.string()
		.min(1, "LeetCode username is required")
		.min(3, "LeetCode username must be at least 3 characters")
		.max(30, "LeetCode username must be less than 30 characters")
		.regex(/^[A-Za-z0-9_.]+$/, "LeetCode username can only contain letters, numbers, dots, and underscores"),
	github: z
		.string()
		.min(1, "GitHub username is required")
		.min(3, "GitHub username must be at least 3 characters")
		.max(39, "GitHub username must be less than 39 characters")
		.regex(/^[A-Za-z0-9-]+$/, "GitHub username can only contain letters, numbers, and hyphens"),
});

// Essays & Resume Schema
export const essaysResumeSchema = z.object({
	aboutSelf: z
		.string()
		.min(1, "About yourself is required")
		.min(50, "About yourself must be at least 50 characters")
		.max(1000, "About yourself must be less than 1000 characters"),
	whyJoin: z
		.string()
		.min(1, "Why you want to join is required")
		.min(50, "Why you want to join must be at least 50 characters")
		.max(1000, "Why you want to join must be less than 1000 characters"),
	resume: z
		.instanceof(File)
		.refine((file) => file.size > 0, "Resume file is required")
		.refine((file) => file.size <= 5 * 1024 * 1024, "Resume file must be less than 5MB")
		.refine(
			(file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
			"Resume must be a PDF, DOC, or DOCX file"
		),
});

// Complete Application Form Schema
export const applicationFormSchema = z.object({
	// Personal Info
	idNumber: z
		.string()
		.min(1, "ID Number is required")
		.min(3, "ID Number must be at least 3 characters")
		.max(20, "ID Number must be less than 20 characters")
		.regex(/^[A-Za-z0-9-]+$/, "ID Number can only contain letters, numbers, and hyphens"),
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
	// Coding Profiles
	codeforces: z
		.string()
		.min(1, "Codeforces username is required")
		.min(3, "Codeforces username must be at least 3 characters")
		.max(30, "Codeforces username must be less than 30 characters")
		.regex(/^[A-Za-z0-9_.]+$/, "Codeforces username can only contain letters, numbers, dots, and underscores"),
	leetcode: z
		.string()
		.min(1, "LeetCode username is required")
		.min(3, "LeetCode username must be at least 3 characters")
		.max(30, "LeetCode username must be less than 30 characters")
		.regex(/^[A-Za-z0-9_.]+$/, "LeetCode username can only contain letters, numbers, dots, and underscores"),
	github: z
		.string()
		.min(1, "GitHub username is required")
		.min(3, "GitHub username must be at least 3 characters")
		.max(39, "GitHub username must be less than 39 characters")
		.regex(/^[A-Za-z0-9-]+$/, "GitHub username can only contain letters, numbers, and hyphens"),
	// Essays & Resume
	aboutSelf: z
		.string()
		.min(1, "About yourself is required")
		.min(50, "About yourself must be at least 50 characters")
		.max(1000, "About yourself must be less than 1000 characters"),
	whyJoin: z
		.string()
		.min(1, "Why you want to join is required")
		.min(50, "Why you want to join must be at least 50 characters")
		.max(1000, "Why you want to join must be less than 1000 characters"),
	resume: z
		.instanceof(File)
		.refine((file) => file.size > 0, "Resume file is required")
		.refine((file) => file.size <= 5 * 1024 * 1024, "Resume file must be less than 5MB")
		.refine(
			(file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
			"Resume must be a PDF, DOC, or DOCX file"
		),
});

// Type definitions
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type CodingProfilesFormData = z.infer<typeof codingProfilesSchema>;
export type EssaysResumeFormData = z.infer<typeof essaysResumeSchema>;
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
