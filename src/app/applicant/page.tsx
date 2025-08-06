import React from "react";
import ApplicationTimeline from "../components/applicationTimeline";
import Card from "../components/card";

export default function page() {
	return (
		<div>
			<div>
				<h1 className="text-2xl font-semibold mt-7">Your Application Progress</h1>
				<p className="text-sm text-gray-600 mt-2">
					You're on your way! Here's summary of your application status.
				</p>
			</div>
			<div className="md:flex w-full justify-center mt-6">
				<ApplicationTimeline />
				<Card />
			</div>
		</div>
	);
}
