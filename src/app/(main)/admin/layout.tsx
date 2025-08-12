import Header from "@/app/components/Header";
import { getProfileData } from "@/utils/profileUtils";
import React from "react";

async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const navlinks = [
		{ href: "/admin/dashboard", label: "Dashboard" },
		{ href: "/admin/users", label: "Users" },
		{ href: "/admin/cycles", label: "Cycles" },
		{ href: "/admin/analytics", label: "Analytics" },
	];
	const user = await getProfileData();
	return (
		<>
			<Header navlinks={navlinks} fullName={user ? user.data.full_name : null} />
			{children}
		</>
	);
}

export default AdminLayout;
