import BurgerMenu from "@/app/components/BurgerMenu";
import Header from "@/app/components/Header";
import SignOut from "@/app/components/SignOut";
import Link from "next/link";
import React from "react";

function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header>
				<div className="hidden md:flex gap-6 justify-center">
					<Link href="/admin/dashboard" className="text-md font-normal">
						Dashboard
					</Link>
					<Link href="/admin/users" className="text-md font-normal">
						Users
					</Link>
					<Link href="/admin/cycles" className="text-md font-normal pb-1">
						Cycles
					</Link>
					<Link href="/admin/analytics" className="text-md font-normal">
						Analytics
					</Link>
				</div>
				<div className="hidden md:flex gap-6 mr-[26px] items-center">
					<Link href="" className="text-sm font-semibold text-[#4F46E5]">
						Your Profile
					</Link>
					<Link href="" className="text-sm font-semibold text-gray-600">
						Admin User
					</Link>
					<SignOut />
				</div>
				<div className="md:hidden flex">
					<BurgerMenu>
						<div className="flex flex-col gap-6 justify-center">
							<Link href="/admin/dashboard" className="text-md font-normal">
								Dashboard
							</Link>
							<Link href="/admin/users" className="text-md font-normal">
								Users
							</Link>
							<Link href="/admin/cycles" className="text-md font-normal pb-1">
								Cycles
							</Link>
							<Link href="/admin/analytics" className="text-md font-normal">
								Analytics
							</Link>
						</div>
						<div className="flex flex-col gap-4 mt-4">
							<p className="text-sm font-semibold">Your Profile</p>
							<p className="text-sm font-semibold text-gray-600">Admin User</p>
							<SignOut />
						</div>
					</BurgerMenu>
				</div>
			</Header>
			{children}
		</>
	);
}

export default AdminLayout;
