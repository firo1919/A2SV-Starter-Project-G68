export type ApplicationStatus = "under-review" | "review-complete" | "new";

export interface Application {
	success: boolean;
	data: {
		id: string;
		applicant_details: {
			id: string;
			applicant_name: string;
			status: ApplicationStatus;
			school: string;
			student_id: string;
			country: string;
			degree: string;
			leetcode_handle: string;
			codeforces_handle: string;
			essay_why_a2sv: string;
			essay_about_you: string;
			resume_url: string;
			submitted_at: string;
			updated_at: string;
		};
		review_details: {
			id: string;
			application_id: string;
			reviewer_id: string;
			activity_check_notes: string;
			resume_score: 0;
			essay_why_a2sv_score: 0;
			essay_about_you_score: 0;
			technical_interview_score: 0;
			behavioral_interview_score: 0;
			interview_notes: string;
			created_at: string;
			updated_at: string;
		};
	};
	message: "str";
}

export interface AssignedReviews {
	success: true;
	data: {
		reviews: AssignedReview[];
		total_count: 0;
		page: 0;
		limit: 0;
	};
	message: string;
}

export interface AssignedReview {
	application_id: string;
	applicant_name: string;
	status: ApplicationStatus;
	submission_date: string;
}
