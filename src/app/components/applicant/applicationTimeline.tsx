"use client";
import { ApplicationStatus } from "@/types/ApplicationForm";
import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";

// Define all possible stages of the application
const STAGES = [
	{
		id: "submitted",
		title: "Application Submitted",
		description: "Your application has been successfully submitted. We're excited to learn more about you!",
	},
	{
		id: "under_review",
		title: "Under Review",
		description:
			"Our team is currently reviewing your application. This may take a few days. Thank you for your patience.",
	},
	{
		id: "interview",
		title: "Interview Stage",
		description: "You've been selected for an interview. We'll contact you soon with details.",
	},
	{
		id: "decision",
		title: "Decision Made",
		description: "A final decision has been made on your application. Check your email for the outcome.",
	},
];

interface ApplicationTimelineProps {
	applicationStatus?: ApplicationStatus | null;
}

export default function ApplicationTimeline({ applicationStatus }: ApplicationTimelineProps) {
	if (!applicationStatus) {
		return (
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-xl font-bold text-gray-800 mb-4">Application Timeline</h2>
				<div className="text-center py-8">
					<p className="text-gray-600">You haven't submitted an application yet.</p>
				</div>
			</div>
		);
	}

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-bold text-gray-800 mb-6">Application Timeline</h2>
			<div>
				{STAGES.map((stage, index) => {
					// Map backend status to timeline stage - more realistic mapping
					const getCurrentStage = (status: string) => {
						const statusLower = status.toLowerCase();

						switch (statusLower) {
							case "submitted":
								return 0; // Submitted stage
							case "pending_review":
							case "under_review":
							case "in_progress":
								return 1; // Under Review stage
							case "interview":
							case "interview_scheduled":
								return 2; // Interview stage
							case "accepted":
							case "rejected":
								return 3; // Decision stage
							default:
								return 0; // Default to submitted
						}
					};

					const currentApplicationStage = getCurrentStage(applicationStatus.status);
					const currentStageIndex = index; // 0, 1, 2, 3

					// More realistic logic:
					// - Only show completed stages that come BEFORE the current stage
					// - Show current stage as active
					// - Show future stages as pending
					const isCompleted = currentStageIndex < currentApplicationStage;
					const isCurrent = currentStageIndex === currentApplicationStage;

					// Determine the description based on the stage status
					let description = stage.description;
					if (isCurrent && stage.id === "decision") {
						if (applicationStatus.status === "rejected") {
							description = applicationStatus.decision_notes || "Thank you for your interest in A2SV.";
						} else {
							description = "Congratulations! Your application has been accepted. Welcome to A2SV!";
						}
					}

					// Show submitted date for the submitted stage
					const showSubmittedDate = stage.id === "submitted" && applicationStatus.submitted_at;

					return (
						<div key={stage.id} className="relative pb-8">
							{/* Connecting line, rendered for all but the last stage */}
							{index < STAGES.length - 1 ? (
								<div
									className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
									aria-hidden="true"
								/>
							) : null}

							<div className="relative flex items-start space-x-4">
								{/* Icon */}
								<div className="relative z-10 h-8 w-8 rounded-full flex items-center justify-center bg-white">
									{isCompleted ? (
										<div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
											<CheckIcon className="w-5 h-5 text-white" />
										</div>
									) : isCurrent ? (
										<div className="h-8 w-8 rounded-full bg-[#6366F1] flex items-center justify-center">
											<div className="w-4 h-4 border-2 border-white border-solid rounded-full border-t-transparent animate-spin"></div>
										</div>
									) : (
										<div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
											<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
										</div>
									)}
								</div>

								{/* Stage Details */}
								<div className="flex-1">
									<p
										className={`font-semibold ${
											isCompleted || isCurrent ? "text-gray-800" : "text-gray-400"
										}`}
									>
										{stage.title}
									</p>
									<p className="text-sm text-gray-500 mt-1">
										{isCurrent
											? "Current Stage"
											: showSubmittedDate
											? formatDate(applicationStatus.submitted_at)
											: ""}
									</p>
									{(isCurrent || (isCompleted && stage.id === "submitted")) && (
										<p className="text-sm text-gray-600 mt-2">{description}</p>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
