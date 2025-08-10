"use client";
import React from "react";
import { useGetApplicationStatusQuery } from "@/lib/redux/api/applicationsApiSlice";
import { ApplicationStatus } from "@/types/ApplicationForm";

export default function ApplicationTimeline() {
	const { data: response, isLoading, error } = useGetApplicationStatusQuery();

	const applicationStatus: ApplicationStatus | null =
		response?.success && response.data && typeof response.data === "object" && "data" in response.data
			? (response.data.data as ApplicationStatus)
			: null;

	if (isLoading) {
		return (
			<div className="p-3 bg-white shadow-xl rounded-md mx-auto w-full max-w-full sm:max-w-lg md:max-w-[800px] h-auto">
				<h1 className="text-lg font-semibold mb-5">Application Timeline</h1>
				<div className="flex items-center justify-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					<span className="ml-2 text-gray-600">Loading application status...</span>
				</div>
			</div>
		);
	}

	if (error || !response?.success) {
		return (
			<div className="p-3 bg-white shadow-xl rounded-md mx-auto w-full max-w-full sm:max-w-lg md:max-w-[800px] h-auto">
				<h1 className="text-lg font-semibold mb-5">Application Timeline</h1>
				<div className="text-center py-8">
					<p className="text-red-600 mb-4">Failed to load application status</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (!applicationStatus) {
		return (
			<div className="p-3 bg-white shadow-xl rounded-md mx-auto w-full max-w-full sm:max-w-lg md:max-w-[800px] h-auto">
				<h1 className="text-lg font-semibold mb-5">Application Timeline</h1>
				<div className="text-center py-8">
					<p className="text-gray-600 mb-4">No application found</p>
					<p className="text-sm text-gray-500">You haven't submitted an application yet.</p>
				</div>
			</div>
		);
	}
	// Helper function to format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Define all timeline stages
	const timelineStages = [
		{
			id: "submitted",
			title: "Application Submitted",
			description: "Your application has been successfully submitted. We're excited to learn more about you!",
			icon: "/images/app.png", // Application icon for submitted stage
			alt: "Application Icon",
			date: applicationStatus.submitted_at,
		},
		{
			id: "under_review",
			title: "Under Review",
			description:
				"Our team is currently reviewing your application. This may take a few days. Thank you for your patience.",
			icon: "/images/under.png", // Circular progress indicator for current stage
			alt: "Under Review Icon",
		},
		{
			id: "interview",
			title: "Interview Stage",
			description: "Congratulations! You've been selected for an interview. We'll contact you soon with details.",
			icon: "/images/img3.png",
			alt: "Interview Stage Icon",
		},
		{
			id: "decision",
			title: "Decision Made",
			description: "Congratulations! Your application has been accepted. Welcome to A2SV!",
			icon: "/images/img3.png",
			alt: "Decision Made Icon",
		},
	];

	// Always show all 4 stages like in the Figma design
	const stagesToShow = timelineStages;

	return (
		<div className="p-3 bg-white shadow-xl rounded-md mx-auto w-full max-w-full sm:max-w-lg md:max-w-[800px] h-auto">
			<h1 className="text-lg font-semibold mb-5">Application Timeline</h1>

			{stagesToShow.map((stage, index) => {
				// Determine stage status based on current application status
				const stageStatus =
					{
						submitted: 0,
						under_review: 1,
						in_progress: 1, // Backend returns 'in_progress' instead of 'under_review'
						pending_review: 1, // Backend also returns 'pending_review' for under review stage
						interview: 2,
						accepted: 3,
						rejected: 3,
					}[applicationStatus.status] || 0;

				const currentStageIndex =
					{
						submitted: 0,
						under_review: 1,
						interview: 2,
						decision: 3,
					}[stage.id] || 0;

				// Corrected logic:
				// - If backend status is "submitted" (0), then submitted is current, others are future
				// - If backend status is "under_review/in_progress/pending_review" (1), then submitted is completed, under_review is current, others are future
				// - If backend status is "interview" (2), then submitted and under_review are completed, interview is current, decision is future
				// - If backend status is "accepted/rejected" (3), then all are completed except decision which is current
				const isCompleted = currentStageIndex < stageStatus;
				const isCurrentStage = currentStageIndex === stageStatus;
				const isFutureStage = currentStageIndex > stageStatus;

				// Get dynamic description and icon based on actual status
				const getStageInfo = () => {
					// Completed stages show checkmark
					if (isCompleted) {
						return {
							description: stage.description,
							icon: "/images/app.png", // Checkmark for completed stages
						};
					}
					// Current stage shows progress indicator
					else if (isCurrentStage) {
						if (stage.id === "submitted") {
							return {
								description: stage.description,
								icon: "/images/app.png", // Application icon for current submitted stage
							};
						} else if (stage.id === "under_review") {
							return {
								description:
									"Our team is currently reviewing your application. This may take a few days. Thank you for your patience.",
								icon: "/images/under.png", // Circular progress indicator for current stage
							};
						} else if (stage.id === "interview") {
							return {
								description:
									"Congratulations! You've been selected for an interview. We'll contact you soon with details.",
								icon: "/images/under.png", // Circular progress indicator for current stage
							};
						} else if (stage.id === "decision") {
							if (applicationStatus.status === "rejected") {
								return {
									description:
										applicationStatus.decision_notes || "Thank you for your interest in A2SV.",
									icon: "/images/under.png", // Circular progress indicator for current stage
								};
							} else {
								return {
									description:
										"Congratulations! Your application has been accepted. Welcome to A2SV!",
									icon: "/images/under.png", // Circular progress indicator for current stage
								};
							}
						}
					}
					// Future stages show original icons and descriptions
					else if (isFutureStage) {
						return {
							description: stage.description,
							icon: stage.icon,
						};
					}

					// Default return the original stage info
					return {
						description: stage.description,
						icon: stage.icon,
					};
				};

				const stageInfo = getStageInfo();

				return (
					<div key={stage.id} className="flex gap-3 sm:gap-4 items-start mb-6">
						<img
							src={stageInfo.icon}
							alt={stage.alt}
							className={`w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-md flex-shrink-0 ${
								isFutureStage ? "opacity-50" : ""
							}`}
						/>
						<div className="flex-1">
							<h2
								className={`text-base sm:text-lg font-semibold ${
									isCompleted ? "text-gray-900" : isCurrentStage ? "text-gray-900" : "text-gray-400"
								}`}
							>
								{stage.title}
							</h2>
							<p className="text-xs font-light text-gray-400">
								{isCompleted && stage.id === "submitted" && applicationStatus.submitted_at
									? formatDate(applicationStatus.submitted_at)
									: isCurrentStage && stage.id === "submitted" && applicationStatus.submitted_at
									? formatDate(applicationStatus.submitted_at)
									: isCurrentStage && applicationStatus.updated_at
									? formatDate(applicationStatus.updated_at)
									: isCurrentStage
									? "Current Stage"
									: isFutureStage
									? ""
									: ""}
							</p>
							{!isFutureStage && <p className="text-sm text-gray-500 mt-1">{stageInfo.description}</p>}
							{isCurrentStage && applicationStatus.reviewer_notes && (
								<div className="mt-2 p-2 bg-blue-50 rounded-md">
									<p className="text-xs text-blue-700 font-medium">Reviewer Notes:</p>
									<p className="text-xs text-blue-600">{applicationStatus.reviewer_notes}</p>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
