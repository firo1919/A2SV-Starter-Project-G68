"use client";
import React from "react";
import Card from "../../../components/applicant/card";
import Header from "../../../components/Header";
import { useRouter } from "next/navigation";
import BurgerMenu from "@/app/components/BurgerMenu";
interface DashboardProps {
	onStartApplication: () => void;
}

export default function Dashboard({ onStartApplication }: DashboardProps) {
	const router = useRouter();

	return (
		<div className="w-full min-h-screen flex flex-col">
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
					<div className="md:hidden flex items-center">
						<BurgerMenu>
							<div className="flex flex-col gap-4 mt-4">
								<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
								<p className="text-sm font-semibold text-gray-600">Applicant Name</p>
								<p className="text-sm font-semibold text-gray-400 cursor-pointer">Logout</p>
							</div>
						</BurgerMenu>
					</div>
				</div>
			</Header>
			<main className="flex-grow flex flex-col items-center justify-start">
				<div className="w-full max-w-6xl px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-start justify-center">
						<div>
							<h1 className="text-2xl font-semibold mb-2">Welcome, John!</h1>
							<p className="text-sm text-gray-600 mb-6">
								Your journey to a global tech career starts now.
							</p>
							<div>
								<div className="bg-gradient-to-r to-[#9333EA] from-[#4F46E5] p-8 rounded-xl shadow-lg mb-8">
									<h2 className="text-2xl font-bold text-white mb-2">G7 November Intake</h2>
									<p className="text-white mb-4">
										It’s time to submit your application and show us your potential.
									</p>
									<button
										className="bg-white text-[#4F46E5] font-semibold px-6 py-2 rounded-md shadow"
										onClick={() => router.push("/applicant/form")}
									>
										Start Application
									</button>
								</div>
							</div>
						</div>
						<div>
							<Card type="dashboard" />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
