import { auth } from "@/auth";
import { ReactNode } from "react";
import Header from "../components/Header";

async function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
	const navlinks = [
		{ href: "#", label: "The Journey" },
		{ href: "#", label: "About" },
		{ href: "#", label: "Testimonials" },
	];
	const session = await auth();
	return (
		<>
			<Header />
			{children}
		</>
	);
}
export default PublicLayout;
