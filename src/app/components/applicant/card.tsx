"use client";
import React from "react";
import { useGetApplicationStatusQuery } from "@/lib/redux/api/applicationsApiSlice";
import { ApplicationStatus } from "@/types/ApplicationForm";

interface CardProps {
	type: "dashboard" | "progress";
}

export default function Card({ type }: CardProps) {
	const { data: response } = useGetApplicationStatusQuery();

	const applicationStatus: ApplicationStatus | null =
		response?.success && response.data && typeof response.data === "object" && "data" in response.data
			? (response.data.data as ApplicationStatus)
			: null;

	// Helper function to format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const cardStyle =
		type === "dashboard"
			? "grid grid-cols-1 gap-3 sm:gap-4 justify-items-center w-full max-w-sm sm:max-w-md lg:max-w-[384px] mx-auto"
			: "grid grid-cols-1 gap-4 sm:gap-6 justify-items-center w-full max-w-sm sm:max-w-md lg:max-w-[384px] mx-auto";

	return (
		<div className="w-full px-2 sm:px-4 lg:px-0 flex justify-center">
			<div className={cardStyle}>
				{type === "dashboard" ? (
					<>
						<div className="shadow-xl bg-white rounded-[8px] p-4 sm:p-6 lg:p-[24px] w-full">
							<h1 className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 text-center">
								Complete Your Profile
							</h1>
							<div className="flex flex-col items-center">
								<div className="inline-block bg-[#A5B4FC] text-[#4F46E5] text-xs font-bold px-3 sm:px-4 py-1 rounded-lg mb-2 sm:mb-3">
									75% COMPLETE
								</div>
								<div className="w-full bg-[#E0E7FF] rounded-full h-2 mb-2">
									<div
										className="bg-gradient-to-r from-[#4F46E5] to-[#4F46E5] h-2 rounded-full"
										style={{ width: "75%" }}
									></div>
								</div>
								<a href="#" className="text-sm text-[#4F46E5] font-medium">
									Go to profile →
								</a>
							</div>
						</div>
						<div className="shadow-xl bg-white rounded-[8px] p-4 sm:p-6 lg:p-[24px] w-full">
							<h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">
								Application Checklist
							</h2>
							<ul className="text-sm sm:text-base text-gray-500 space-y-2 sm:space-y-3">
								<li className="flex items-center gap-2">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4 flex-shrink-0" />
									<span className="text-xs sm:text-sm">Create an Account</span>
								</li>
								<li className="flex items-center gap-2">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4 flex-shrink-0" />
									<span className="text-xs sm:text-sm">Fill Personal Information</span>
								</li>
								<li className="flex items-center gap-2">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4 flex-shrink-0" />
									<span className="text-xs sm:text-sm">Submit Coding Profiles</span>
								</li>
								<li className="flex items-center gap-2">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4 flex-shrink-0" />
									<span className="text-xs sm:text-sm">Write Essays</span>
								</li>
								<li className="flex items-center gap-2">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4 flex-shrink-0" />
									<span className="text-xs sm:text-sm">Upload Resume</span>
								</li>
							</ul>
						</div>
						<div className="shadow-xl bg-white rounded-[8px] p-4 sm:p-6 lg:p-[24px] w-full">
							<h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Helpful Resources</h2>
							<ul className="text-sm sm:text-base space-y-2">
								<li>
									<a href="#" className="text-[#4F46E5] font-medium text-xs sm:text-sm">
										Tips for a Great Application
									</a>
								</li>
								<li>
									<a href="#" className="text-[#4F46E5] font-medium text-xs sm:text-sm">
										A2SV Problem Solving Guide
									</a>
								</li>
							</ul>
						</div>
					</>
				) : (
					<>
						<div className="shadow-xl bg-white rounded-[8px] p-4 sm:p-6 lg:p-[24px] w-full">
							<h1 className="text-base sm:text-lg font-semibold mb-3 sm:mb-5 text-left">
								Recent Activity
							</h1>
							<div className="flex flex-col gap-3 sm:gap-4">
								{applicationStatus && (
									<div className="flex items-center gap-2 sm:gap-3">
										<div className="rounded-full p-1 sm:p-2 flex items-center justify-center">
											<img
												src="/images/image.png"
												alt="Application Submitted"
												className="w-8 h-8 sm:w-10 sm:h-10"
											/>
										</div>
										<div>
											<p className="text-sm sm:text-base font-semibold text-gray-700">
												Application Submitted
											</p>
											<p className="text-xs sm:text-sm text-gray-400">
												{applicationStatus.submitted_at
													? formatDate(applicationStatus.submitted_at)
													: "Date not available"}
											</p>
										</div>
									</div>
								)}
								{applicationStatus && applicationStatus.status === "interview" && (
									<div className="flex items-center gap-2 sm:gap-3">
										<div className="rounded-full p-1 sm:p-2 flex">
											<img
												src="/images/img2.png"
												alt="Interview Scheduled"
												className="w-8 h-8 sm:w-10 sm:h-10"
											/>
										</div>
										<div>
											<p className="text-sm sm:text-base font-semibold text-gray-700">
												Interview Scheduled
											</p>
											<p className="text-xs sm:text-sm text-gray-400">
												{applicationStatus.updated_at
													? formatDate(applicationStatus.updated_at)
													: "Date not available"}
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="shadow-xl bg-white rounded-[8px] p-4 sm:p-6 lg:p-[24px] w-full">
							<h1 className="text-base sm:text-lg font-semibold mb-2 text-center">Important Updates</h1>
							<p className="text-xs sm:text-sm font-light text-center">
								There are no new updates at this time. We will notify you by email when your application
								status changes.
							</p>
						</div>
						<div className="shadow-xl bg-[#4F46E5] rounded-[8px] p-4 sm:p-6 lg:p-[24px] w-full">
							<h1 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white text-center">
								Get Ready for the Interview!
							</h1>
							<h2 className="text-xs sm:text-sm font-bold text-white text-center">
								While you wait, it's a great time to prepare. Practice your problem-solving skills on
								platforms like LeetCode and Codeforces.
							</h2>
							<p className="text-xs sm:text-sm font-bold text-white mt-2 text-center">
								Read our interview prep guide →
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
