"use client";
import React from "react";
import Card from "./card";
import ApplicationTimeline from "./applicationTimeline";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApplicationStatus } from "@/types/ApplicationForm";

interface ProgressClientProps {
	initialApplicationStatus: any;
	initialProfileData: any;
}

export default function ProgressClient({ initialApplicationStatus, initialProfileData }: ProgressClientProps) {
	const { data: session } = useSession();

	// Get name from profile or session with fallback
	const profileData = initialProfileData?.success ? initialProfileData.data : null;
	let userName = profileData?.full_name || (session?.user as any)?.name || "Applicant Name";

	// Extract application status for components
	const applicationStatus: ApplicationStatus | null =
		initialApplicationStatus?.success && initialApplicationStatus.data
			? (initialApplicationStatus.data as ApplicationStatus)
			: null;

	return (
		<main className="flex-grow flex flex-col items-center justify-start pt-6 sm:pt-8 lg:pt-10">
			<div className="w-full max-w-6xl px-4 sm:px-6">
				<div className="mb-4 sm:mb-6">
					<h1 className="text-xl sm:text-2xl font-semibold mb-2">Your Application Progress</h1>
					<p className="text-sm text-gray-600">
						You're on your way! Here's a summary of your application status.
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-start justify-center">
					<div className="order-1 lg:order-1 lg:col-span-2">
						<ApplicationTimeline applicationStatus={applicationStatus} />
					</div>
					<div className="order-2 lg:order-2">
						<Card type="progress" applicationStatus={applicationStatus} />
					</div>
				</div>
			</div>
			<ToastContainer />
		</main>
	);
}
