"use client";
import React from "react";
import Card from "../../../components/applicant/card";
import ApplicationTimeline from "../../../components/applicant/applicationTimeline";
import Header from "../../../components/Header";
import BurgerMenu from "@/app/components/BurgerMenu";

export default function Progress() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header>
				<div className="flex w-full items-center justify-between">
					<div className="flex-1 flex justify-center">
						<p className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Dashboard</p>
					</div>
					<div className="hidden md:flex gap-6 mr-[26px] items-center">
						<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
						<p className="text-sm font-semibold text-gray-600">Applicant Name</p>
						<p className="text-sm font-semibold text-gray-400 cursor-pointer">Logout</p>
					</div>
					<div className="md:hidden flex items-center">
						<BurgerMenu>
							{/* Add header items inside BurgerMenu for mobile */}
							<div className="flex flex-col gap-4 mt-4">
								<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
								<p className="text-sm font-semibold text-gray-600">Applicant Name</p>
								<p className="text-sm font-semibold text-gray-400 cursor-pointer">Logout</p>
							</div>
						</BurgerMenu>{" "}
					</div>
				</div>
			</Header>
			<main className="flex-grow flex flex-col items-center justify-start">
				<div className="w-full max-w-6xl px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-start justify-center">
						<div>
							<h1 className="text-2xl font-semibold mb-2">Your Application Progress</h1>
							<p className="text-sm text-gray-600 mb-6">
								You're on your way! Here's a summary of your application status.
							</p>
							<ApplicationTimeline />
						</div>
						<div>
							<Card type="progress" />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
