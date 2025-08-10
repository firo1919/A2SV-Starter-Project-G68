"use client";
import React, { useEffect } from "react";
import Card from "../../../components/applicant/card";
import ApplicationTimeline from "../../../components/applicant/applicationTimeline";
import Header from "../../../components/Header";
import BurgerMenu from "@/app/components/BurgerMenu";
import { useGetProfileQuery } from "@/lib/redux/api/profileApiSlice";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Progress() {
	const { data: profileResponse, isLoading: profileLoading } = useGetProfileQuery();
	const { data: session } = useSession();
	const searchParams = useSearchParams();

	// Get name from profile or session with fallback
	const profileData =
		profileResponse?.success && (profileResponse.data as any)?.data ? (profileResponse.data as any).data : null;
	let userName = profileData?.full_name || (session?.user as any)?.name || "Applicant Name";

	const handleLogout = () => {
		signOut();
	};

	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header>
				<div className="flex w-full items-center justify-between">
					<div className="flex-1 flex justify-center">
						<p className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Dashboard</p>
					</div>
					<div className="hidden md:flex gap-6 mr-[26px] items-center">
						<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
						<p className="text-sm font-semibold text-gray-600">{userName}</p>
						<p className="text-sm font-semibold text-gray-400 cursor-pointer" onClick={handleLogout}>
							Logout
						</p>
					</div>
					<div className="md:hidden flex items-center">
						<BurgerMenu>
							{/* Add header items inside BurgerMenu for mobile */}
							<div className="flex flex-col gap-4 mt-4">
								<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
								<p className="text-sm font-semibold text-gray-600">{userName}</p>
								<p
									className="text-sm font-semibold text-gray-400 cursor-pointer"
									onClick={handleLogout}
								>
									Logout
								</p>
							</div>
						</BurgerMenu>{" "}
					</div>
				</div>
			</Header>
			<main className="flex-grow flex flex-col items-center justify-start">
				<div className="w-full max-w-6xl px-4 sm:px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10 items-start justify-center">
						<div className="order-1 lg:order-1">
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
		</div>
	);
}
