"use client";
import React from "react";
import Card from "../../../components/applicant/card";
import Header from "../../../components/Header";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();

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
			<div className="flex flex-col md:flex-row justify-center items-start mt-10 gap-8">
				<div className="flex-1 min-w-0">
					<h1 className="text-2xl font-semibold mb-2 md:ml-[325px]">Welcome, John!</h1>
					<p className="text-sm text-gray-600 mb-6 md:ml-[325px]">
						Your journey to a global tech career starts now.
					</p>
					<div className="md:ml-[325px]">
						<div className="bg-gradient-to-r from-[#7B61FF] to-[#4F46E5] p-8 rounded-xl shadow-lg mb-8">
							<h2 className="text-2xl font-bold text-white mb-2">G7 November Intake</h2>
							<p className="text-white mb-4">
								It’s time to submit your application and show us your potential.
							</p>
							<button
								className="bg-white text-[#4F46E5] font-semibold px-6 py-2 rounded-md shadow"
								onClick={() => router.push("/applicant/progress")}
							>
								Start Application
							</button>
						</div>
					</div>
				</div>
				<div className="w-full md:w-auto">
					<Card type="dashboard" />
				</div>
			</div>
		</div>
	);
}
