"use client";

import BurgerMenu from "@/app/components/BurgerMenu";
import Header from "@/app/components/Header";
import { useGetProfileQuery } from "@/lib/redux/api/profileApiSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ProfileProvider } from "@profile/ProfileContext";

export default function ApplicantLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);
	const { data: session, status } = useSession();
	const { data: profileResponse, isLoading: profileLoading } = useGetProfileQuery();
	const pathname = usePathname();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted && status === "unauthenticated") {
			router.replace("/login");
		}
	}, [isMounted, status, router]);

	const profileData =
		profileResponse?.success && (profileResponse.data as any)?.data ? (profileResponse.data as any).data : null;

	const userName = profileData?.full_name || profileData?.fullName || (session?.user as any)?.name || "Applicant";

	const handleLogout = () => {
		signOut({ callbackUrl: "/login" });
	};

	const navLinks = [{ href: "/applicant/dashboard", label: "Dashboard" }];

	return (
		<ProfileProvider>
			<div className="w-full min-h-screen flex flex-col">
				<Header>
					<div className="flex w-full items-center justify-between">
						{/* Desktop Navigation */}
						<div className="hidden md:flex w-full items-center">
							<div className="flex-1" />

							<div className="flex-1 flex justify-between">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className={`text-md font-medium pb-1 transition-colors ${
											pathname.startsWith(link.href)
												? "text-indigo-600 border-b-2 border-indigo-600"
												: "text-gray-600 hover:text-indigo-600"
										}`}
									>
										{link.label}
									</Link>
								))}
							</div>

							<div className="flex-1 flex justify-end items-center gap-8">
								{isMounted && status === "authenticated" && (
									<>
										<Link
											href="/applicant/yourprofile"
											className={`text-sm font-semibold ${
												pathname.startsWith("/applicant/yourprofile")
													? "text-indigo-600"
													: "text-indigo-600/70 hover:text-indigo-600"
											}`}
										>
											Your Profile
										</Link>
										<span className="text-sm text-gray-700 whitespace-nowrap">
											{profileLoading ? "Loading..." : userName}
										</span>
										<button
											onClick={handleLogout}
											className="text-sm font-medium text-gray-500 hover:text-gray-800"
										>
											Logout
										</button>
									</>
								)}
							</div>
						</div>

						{/* Mobile Navigation */}
						<div className="md:hidden flex w-full justify-end items-center">
							<BurgerMenu>
								{isMounted && status === "authenticated" && (
									<>
										<nav className="flex flex-col gap-4 mt-4">
											{navLinks.map((link) => (
												<Link
													key={link.href}
													href={link.href}
													className="text-gray-700 hover:text-gray-900"
												>
													{link.label}
												</Link>
											))}
											<Link href="/applicant/yourprofile" className="text-indigo-600 font-medium">
												Your Profile
											</Link>
										</nav>
										<hr className="my-4" />
										<div className="flex flex-col gap-3 items-start">
											<span className="text-sm text-gray-700">
												{profileLoading ? "Loading..." : userName}
											</span>
											<button
												onClick={handleLogout}
												className="text-sm font-medium text-gray-500 hover:text-gray-800"
											>
												Logout
											</button>
										</div>
									</>
								)}
							</BurgerMenu>
						</div>
					</div>
				</Header>
				{children}
			</div>
		</ProfileProvider>
	);
}
