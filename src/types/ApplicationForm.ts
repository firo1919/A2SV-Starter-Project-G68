export interface ApplicationFormData {
	student_id: string;
	school: string;
	degreeProgram: string;
	codeforces_handle: string;
	leetcode_handle: string;
	github: string;
	essay_about_you: string;
	essay_why_a2sv: string;
	resume: File | null;
}
