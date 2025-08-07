"use client";
import React from "react";
import Card from "../../../components/applicant/card";
import ApplicationTimeline from "../../../components/applicant/applicationTimeline";
import Header from "../../../components/Header";

export default function Progress() {
	return (
		<div>
			<Header>
				<div className="flex w-full items-center justify-between">
					<div className="flex-1 flex justify-center">
						<p className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Dashboard</p>
					</div>
					<div className="flex gap-6 mr-[26px] items-center">
						<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
						<p className="text-sm font-semibold text-gray-600">Applicant Name</p>
						<p className="text-sm font-semibold text-gray-400 cursor-pointer">Logout</p>
					</div>
				</div>
			</Header>
			<div className="w-full flex flex-col md:flex-row justify-center items-start mt-10 gap-8">
				<div className="flex-1 min-w-0">
					<h1 className="text-2xl font-semibold mb-2 md:ml-[325px]">Your Application Progress</h1>
					<p className="text-sm text-gray-600 mb-6 md:ml-[325px]">
						You're on your way! Here's a summary of your application status.
					</p>
					<ApplicationTimeline />
				</div>
				<div className="w-full md:w-auto">
					<Card type="progress" />
				</div>
			</div>
		</div>
	);
}
