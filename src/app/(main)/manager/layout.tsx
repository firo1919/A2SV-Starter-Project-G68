import Header from "@/app/components/Header";
import { getProfileData } from "@/utils/profileUtils";

async function ReviewersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const navlinks = [{ href: "/manager/dashboard", label: "Dashboard" }];
	const user = await getProfileData();
	return (
		<>
			<Header navlinks={navlinks} fullName={user ? user.data.full_name : null} />
			{children}
		</>
	);
}
export default ReviewersLayout;
