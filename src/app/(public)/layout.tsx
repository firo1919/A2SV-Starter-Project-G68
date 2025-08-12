import { auth } from "@/auth";
import { getProfileData } from "@/utils/profileUtils";
import { ReactNode } from "react";
import Header from "../components/Header";

async function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
	const navlinks = [
		{ href: "#thejourney", label: "The Journey" },
		{ href: "#about", label: "About" },
		{ href: "#testimonials", label: "Testimonials" },
	];
	const user = await getProfileData();
	const session = await auth();
	if (session?.user) {
		navlinks.push({ href: `/${session.user.role}/dashboard`, label: "Dashboard" });
	}
	return (
		<>
			<Header navlinks={navlinks} fullName={user ? user.data.full_name : null} />
			{children}
		</>
	);
}
export default PublicLayout;
