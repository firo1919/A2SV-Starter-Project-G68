import Header from "@/app/components/Header";
import { auth } from "@/auth";
import { getProfileData } from "@/utils/profileUtils";
import { ReactNode } from "react";

async function ProfileLayout({ children }: Readonly<{ children: ReactNode }>) {
	const navlinks = [
		{ href: "#", label: "The Journey" },
		{ href: "#", label: "About" },
		{ href: "#", label: "Testimonials" },
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
export default ProfileLayout;
