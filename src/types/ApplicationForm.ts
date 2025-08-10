export interface ApplicationFormData {
	resume: File | null;
	school: string;
	student_id: string;
	leetcode_handle: string;
	codeforces_handle: string;
	essay_why_a2sv: string;
	essay_about_you: string;
	country: string;
	degree: string;
}

export interface ApplicationStatus {
	id: string;
	status: "submitted" | "under_review" | "in_progress" | "interview" | "accepted" | "rejected";
	submitted_at: string;
	updated_at?: string;
	decision_notes?: string;
	reviewer_notes?: string;
	school?: string;
	country?: string;
	degree?: string;
	application_data?: {
		student_id: string;
		school: string;
		degree: string;
		country: string;
		codeforces_handle: string;
		leetcode_handle: string;
		essay_about_you: string;
		essay_why_a2sv: string;
	};
}
