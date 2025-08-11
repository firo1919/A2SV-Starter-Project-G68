"use client";
import { useGetApplicationStatusQuery } from "@/lib/redux/api/applicationsApiSlice";
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

export default function ApplicationTimeline() {
	const { data: response, isLoading, isError } = useGetApplicationStatusQuery();

	const applicationStatus: ApplicationStatus | null =
		response?.success && response.data && typeof response.data === "object" && "data" in response.data
			? (response.data.data as ApplicationStatus)
			: null;

	// Skeleton loader for when data is being fetched
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

	if (isError || !response?.success) {
		return (
			<div className="bg-white p-6 rounded-lg shadow-md text-center">
				<p className="text-red-500 font-semibold">Could not load application status.</p>
				<p className="text-sm text-gray-500 mt-2">Please try again later.</p>
			</div>
		);
	}

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
					// Your requested logic for determining stage status
					const stageStatus =
						{
							submitted: 0,
							under_review: 1,
							in_progress: 1,
							pending_review: 1,
							interview: 2,
							accepted: 3,
							rejected: 3,
						}[applicationStatus.status.toLowerCase()] || 0;

					const currentStageIndex =
						{
							submitted: 0,
							under_review: 1,
							interview: 2,
							decision: 3,
						}[stage.id] || 0;

					const isCompleted = currentStageIndex < stageStatus;
					const isCurrent = currentStageIndex === stageStatus;

					// Determine the description based on the stage status
					let description = stage.description;
					if (isCurrent && stage.id === "decision") {
						if (applicationStatus.status === "rejected") {
							description = applicationStatus.decision_notes || "Thank you for your interest in A2SV.";
						} else {
							description = "Congratulations! Your application has been accepted. Welcome to A2SV!";
						}
					}

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
											: isCompleted && stage.id === "submitted"
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
