"use client";
import React from "react";
import Card from "../../../components/applicant/card";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/lib/redux/api/profileApiSlice";
import { useGetApplicationStatusQuery } from "@/lib/redux/api/applicationsApiSlice";
import { useSession } from "next-auth/react";

export default function Dashboard() {
	const router = useRouter();
	const { data: profileResponse } = useGetProfileQuery();
	const { data: applicationStatusResponse, isLoading: applicationStatusLoading } = useGetApplicationStatusQuery();
	const { data: session } = useSession();

	// Get name from profile or session with fallback
	const profileData =
		profileResponse?.success && (profileResponse.data as any)?.data ? (profileResponse.data as any).data : null;
	let userName = profileData?.full_name || (session?.user as any)?.name || "Applicant Name";

	// Check if user has already submitted an application
	const hasSubmittedApplication =
		applicationStatusResponse?.success &&
		applicationStatusResponse.data &&
		typeof applicationStatusResponse.data === "object" &&
		"data" in applicationStatusResponse.data &&
		applicationStatusResponse.data.data;

	const handleStartApplication = () => {
		if (hasSubmittedApplication) {
			// If application already submitted, redirect to progress page
			router.push("/applicant/progress");
		} else {
			// If no application submitted, redirect to create application form
			router.push("/applicant/create_application");
		}
	};

	return (
		<main className="flex-grow flex flex-col items-center justify-start pt-6 sm:pt-8 lg:pt-10">
			<div className="w-full max-w-6xl px-4 sm:px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start justify-center">
					<div className="order-1 lg:order-1">
						<h1 className="text-xl sm:text-2xl font-semibold mb-2">Welcome, {userName.split(" ")[0]}!</h1>
						<p className="text-sm text-gray-600 mb-4 sm:mb-6">
							Your journey to a global tech career starts now.
						</p>
						<div>
							<div className="bg-gradient-to-r to-[#9333EA] from-[#4F46E5] p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg mb-6 sm:mb-8">
								<h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
									G7 November Intake
								</h2>
								<p className="text-white mb-3 sm:mb-4 text-sm sm:text-base">
									{applicationStatusLoading
										? "Checking your application status..."
										: hasSubmittedApplication
										? "Track your application progress and stay updated on your status."
										: "It's time to submit your application and show us your potential."}
								</p>
								<button
									className="bg-white text-[#4F46E5] font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow text-sm sm:text-base w-full sm:w-auto"
									onClick={handleStartApplication}
									disabled={applicationStatusLoading}
								>
									{applicationStatusLoading
										? "Loading..."
										: hasSubmittedApplication
										? "View Application"
										: "Start Application"}
								</button>
							</div>
						</div>
					</div>
					<div className="order-2 lg:order-2">
						<Card type="dashboard" />
					</div>
				</div>
			</div>
		</main>
	);
}
