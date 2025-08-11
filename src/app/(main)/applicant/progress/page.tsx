"use client";
import React from "react";
import Card from "../../../components/applicant/card";
import ApplicationTimeline from "../../../components/applicant/applicationTimeline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Progress() {
	return (
		<>
			<main className="flex-grow flex flex-col items-center justify-start">
				<div className="w-full max-w-6xl px-4 sm:px-6">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 mt-6 sm:mt-8 lg:mt-10 items-start justify-center">
						<div className="order-1 lg:order-1 lg:col-span-2">
							<div className="mb-4 sm:mb-6">
								<h1 className="text-xl sm:text-2xl font-semibold mb-2">Your Application Progress</h1>
								<p className="text-sm text-gray-600">
									You're on your way! Here's a summary of your application status.
								</p>
							</div>
							<ApplicationTimeline />
						</div>
						<div className="order-2 lg:order-2">
							<Card type="progress" />
						</div>
					</div>
				</div>
			</main>
			<ToastContainer />
		</>
	);
}
