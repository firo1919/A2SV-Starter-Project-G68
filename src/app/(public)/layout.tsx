import { auth } from "@/auth";
import Link from "next/link";
import { ReactNode } from "react";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
import SignOut from "../components/SignOut";

async function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
	const navlinks = [
		{ href: "#", label: "The Journey" },
		{ href: "#", label: "About" },
		{ href: "#", label: "Testimonials" },
	];
	const session = await auth();
	return (
		<>
			<Header>
				<div className="hidden md:flex items-center">
					{navlinks.map((link) => (
						<a
							className="font-medium text-oxford-blue mr-8 hover:border-b-2 hover:border-royal-blue"
							key={`${link.href + link.label}`}
							href={link.href}
						>
							{link.label}
						</a>
					))}
					{session?.user && (
						<a
							className="font-medium text-oxford-blue mr-8 hover:border-b-2 hover:border-royal-blue"
							href={`/${session.user.role}`}
						>
							Dashboard
						</a>
					)}
				</div>
				<div className="hidden md:flex items-center gap-2">
					{session?.user ? (
						<SignOut />
					) : (
						<Link
							href="/login"
							className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md"
						>
							Sign in
						</Link>
					)}
					<Link
						href="/applicant/dashboard"
						className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md"
					>
						Apply now
					</Link>
				</div>
				<div className="md:hidden">
					<BurgerMenu>
						<div className="flex flex-col gap-4">
							{navlinks.map((link) => (
								<a
									className="font-medium text-oxford-blue pr-8"
									key={`${link.href + link.label}`}
									href={link.href}
								>
									{link.label}
								</a>
							))}
							{session?.user && (
								<a className="font-medium text-oxford-blue pr-8" href={`/${session.user.role}`}>
									Dashboard
								</a>
							)}
						</div>
						<div className="flex flex-col gap-4">
							{session?.user && <SignOut />}
							<button className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md">
								Apply now
							</button>
						</div>
					</BurgerMenu>
				</div>
			</Header>
			{children}
		</>
	);
}
export default PublicLayout;
