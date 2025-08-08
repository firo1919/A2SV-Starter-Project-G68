import React from "react";

interface CardProps {
	type: "dashboard" | "progress";
}

export default function Card({ type }: CardProps) {
	const cardStyle =
		type === "dashboard"
			? "grid grid-cols-1 gap-4 justify-items-center w-full max-w-sm sm:max-w-md md:max-w-[384px] mx-auto"
			: "grid grid-cols-1 gap-6 justify-items-center w-full max-w-sm sm:max-w-md md:max-w-[384px] mx-auto";

	return (
		<div className="w-full px-2 sm:px-4 md:px-0 flex justify-center">
			<div className={cardStyle}>
				{type === "dashboard" ? (
					<>
						<div className="shadow-xl bg-white rounded-[8px] p-[24px] w-full">
							<h1 className="text-xl font-bold mb-5 text-center">Complete Your Profile</h1>
							<div className="flex flex-col items-center">
								<div className="inline-block bg-[#A5B4FC] text-[#4F46E5] text-xs font-bold px-4 py-1 rounded-lg mb-3">
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
						<div className="shadow-xl bg-white rounded-[8px] p-[24px] w-full">
							<h2 className="text-xl font-bold mb-4 text-center">Application Checklist</h2>
							<ul className="text-base text-gray-500 space-y-3">
								<li className="flex items-center gap-2 ">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4" />
									Create an Account
								</li>
								<li className="flex items-center gap-2 ">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4" />
									Fill Personal Information
								</li>
								<li className="flex items-center gap-2 ">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4" />
									Submit Coding Profiles
								</li>
								<li className="flex items-center gap-2 ">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4" />
									Write Essays
								</li>
								<li className="flex items-center gap-2 ">
									<img src="/images/check.png" alt="Checked" className="w-4 h-4" />
									Upload Resume
								</li>
							</ul>
						</div>
						<div className="shadow-xl bg-white rounded-[8px] p-[24px] w-full">
							<h2 className="text-xl font-bold mb-4 ">Helpful Resources</h2>
							<ul className="text-base space-y-2">
								<li className="">
									<a href="#" className="text-[#4F46E5] font-medium">
										Tips for a Great Application
									</a>
								</li>
								<li className="">
									<a href="#" className="text-[#4F46E5] font-medium">
										A2SV Problem Solving Guide
									</a>
								</li>
							</ul>
						</div>
					</>
				) : (
					<>
						<div className="shadow-xl bg-white rounded-[8px] p-[24px] w-full">
							<h1 className="text-lg font-semibold mb-5 text-left">Recent Activity</h1>
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-3">
									<div className="rounded-full p-2 flex items-center justify-center">
										<img
											src="/images/image.png"
											alt="Application Submitted"
											className="w-10 h-10"
										/>
									</div>
									<div>
										<p className="text-base font-semibold text-gray-700">Application Submitted</p>

										<p className="text-sm text-gray-400">October 26, 2023</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className=" rounded-full p-2 flex ">
										<img src="/images/img2.png" alt="Interview Scheduled" className="w-10 h-10" />
									</div>
									<div>
										<p className="text-base font-semibold text-gray-700">Interview Scheduled</p>
										<p className="text-sm text-gray-400">November 5, 2023</p>
									</div>
								</div>
							</div>
						</div>
						<div className="shadow-xl bg-white rounded-[8px] p-[24px] w-full">
							<h1 className="text-lg font-semibold mb-2 text-center">Important Updates</h1>
							<p className="text-sm font-light text-center">
								There are no new updates at this time. We will notify you by email when your application
								status changes.
							</p>
						</div>
						<div className="shadow-xl bg-[#4F46E5] rounded-[8px] p-[24px] w-full">
							<h1 className="text-lg font-semibold mb-3 text-white text-center">
								Get Ready for the Interview!
							</h1>
							<h2 className="text-sm font-bold text-white text-center">
								While you wait, it's a great time to prepare. Practice your problem-solving skills on
								platforms like LeetCode and Codeforces.
							</h2>
							<p className="text-sm font-bold text-white mt-2 text-center">
								Read our interview prep guide →
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
