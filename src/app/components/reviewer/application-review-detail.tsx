import ReviewForm from "@/app/components/reviewer/review-form";
import { Application } from "@/types/reviewerTypes";
import Image from "next/image";
import Link from "next/link";

interface ApplicationReviewDetailProps {
	application: Application;
}

export default function ApplicationReviewDetail({ application }: ApplicationReviewDetailProps) {
	return (
		<div className="py-8 relative">
			<Link
				href="/reviewer/dashboard"
				className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				Back to Dashboard
			</Link>

			<h1 className="text-4xl font-bold text-gray-900 mb-8">
				Review: {application.data.applicant_details.applicant_name}
			</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="bg-white rounded-lg shadow-sm p-6 col-span-2">
					<div className="mb-6">
						<h2 className="text-2xl font-semibold text-gray-900">Applicant Profile</h2>
					</div>
					<div className="space-y-4 text-gray-700">
						<div className="flex items-center gap-4">
							<Image
								src="/images/caleb.png"
								alt={`${application.data.applicant_details.applicant_name}'s avatar`}
								width={64}
								height={64}
								className="rounded-full border-2 border-gray-200"
							/>
							<div>
								<p className="text-lg font-medium">
									{application.data.applicant_details.applicant_name}
								</p>
								<p className="text-sm text-gray-600">
									Submitted: {application.data.applicant_details.submitted_at}
								</p>
								<span
									className={`
											inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${
												application.data.applicant_details.status === "under-review"
													? "bg-yellow-100 text-yellow-800"
													: application.data.applicant_details.status === "review-complete"
													? "bg-green-100 text-green-800"
													: "bg-blue-100 text-blue-800"
											}
										`}
								>
									{application.data.applicant_details.status
										.replace(/-/g, " ")
										.replace(/\b\w/g, (char) => char.toUpperCase())}
								</span>
							</div>
						</div>

						{application.data.applicant_details.school && application.data.applicant_details.school && (
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="font-medium text-pale-sky">School</p>
									<p className="text-ebony">{application.data.applicant_details.school}</p>
								</div>
								<div>
									<p className="font-medium text-pale-sky">Degree Program</p>
									<p className="text-ebony">{application.data.applicant_details.degree}</p>
								</div>
							</div>
						)}

						<div>
							<p className="font-medium mb-1 text-pale-sky">Coding Profiles</p>
							<div className="flex gap-4">
								{application.data.applicant_details.leetcode_handle && (
									<a
										href={application.data.applicant_details.leetcode_handle}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										LeetCode
									</a>
								)}
								{application.data.applicant_details.codeforces_handle && (
									<a
										href={application.data.applicant_details.codeforces_handle}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										Codeforces
									</a>
								)}
							</div>
						</div>

						<div>
							<p className="font-medium text-pale-sky">Essay 1: Tell us about your self.?</p>
							<p className="break-all text-ebony">{application.data.applicant_details.essay_about_you}</p>
						</div>

						<div>
							<p className="font-medium text-pale-sky">Essay 2: Why do you want to Join us?</p>
							<p className="break-all text-ebony">{application.data.applicant_details.essay_why_a2sv}</p>
						</div>

						<div>
							<p className="font-medium text-pale-sky">Resume</p>
							<a
								href={application.data.applicant_details.resume_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:underline"
							>
								View Resume.pdf
							</a>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm p-6 w-full">
					<div className="mb-6">
						<h2 className="text-2xl font-semibold text-gray-900">Evaluation Form</h2>
					</div>
					<div>
						{application.data.review_details ? (
							<ReviewForm
								applicationId={application.data.applicant_details.id}
								currentActivityCheckNotes={application.data.review_details.activity_check_notes}
								currentInterviewNotes={application.data.review_details.interview_notes}
								currentResumeScore={application.data.review_details.resume_score}
								currentEssay1Score={application.data.review_details.essay_why_a2sv_score}
								currentEssay2Score={application.data.review_details.essay_why_a2sv_score}
								currentTechnicalInterviewScore={application.data.review_details.essay_why_a2sv_score}
								currentBehavioralInterviewScore={application.data.review_details.essay_why_a2sv_score}
							/>
						) : (
							<ReviewForm applicationId={application.data.applicant_details.id} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
