import React from "react";

export default function ApplicationTimeline() {
	return (
		<div className="p-3 bg-white shadow-xl rounded-md mx-auto w-full max-w-full sm:max-w-lg md:max-w-[800px] h-auto">
			<h1 className="text-lg font-semibold mb-5">Application Timeline</h1>
			<div className="flex gap-6 items-start mb-6 flex-col md:flex-row">
				<img src="/images/app.png" alt="Application Icon" className="w-10 h-10 object-cover rounded-md" />
				<div>
					<h2 className="text-lg font-semibold">Application Submitted</h2>
					<p className="text-xs font-light text-gray-400">October 22, 2025</p>
					<p className="text-sm text-gray-500">
						Your application has been successfully submitted. We're excited to learn more about you!
					</p>
				</div>
			</div>
			<div className="flex gap-6 items-start mb-6 flex-col md:flex-row">
				<img src="/images/under.png" alt="Under Review Icon" className="w-10 h-10 object-cover rounded-md" />
				<div>
					<h2 className="text-lg font-semibold">Under Review</h2>
					<p className="text-xs font-light text-gray-400">Current Stage</p>
					<p className="text-sm text-gray-500">
						Our team is currently reviewing your application. This may take a few days. Thank you for your
						patience.
					</p>
				</div>
			</div>
			<div className="flex gap-2 items-start mb-6 flex-col md:flex-row mt-7">
				<img src="/images/img3.png" alt="Interview Stage Icon" className="w-10 h-10 object-cover rounded-md" />
				<div>
					<h2 className="text-lg font-semibold text-gray-400">Interview Stage</h2>
				</div>
			</div>
			<div className="flex gap-2 items-start flex-col md:flex-row mt-5">
				<img src="/images/img3.png" alt="Decision Made Icon" className="w-10 h-10 object-cover rounded-md" />
				<div>
					<h2 className="text-lg font-semibold text-gray-400">Decision Made</h2>
				</div>
			</div>
		</div>
	);
}
