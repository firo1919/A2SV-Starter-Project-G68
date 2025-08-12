"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import SignOut from "./SignOut";
import UserName from "./UserName";

interface Props {
	navlinks: { href: string; label: string }[];
	fullName: string | null;
}

function Header({ navlinks, fullName }: Props) {
	const { data: session } = useSession();

	const renderNavLinks = () =>
		navlinks.map((link) => (
			<Link
				className="font-medium text-oxford-blue mr-8 hover:border-b-2 hover:border-royal-blue"
				key={`${link.href + link.label}`}
				href={link.href}
			>
				{link.label}
			</Link>
		));

	const renderSessionActions = () =>
		session?.user && fullName ? (
			<>
				<Link href="/profile" className="text-sm font-semibold text-[#4F46E5]">
					Your Profile
				</Link>
				<UserName fullName={fullName} />
				<SignOut />
			</>
		) : (
			<>
				<Link
					href="/login"
					className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md"
				>
					Sign in
				</Link>
				<Link
					href="/applicant/dashboard"
					className="bg-royal-blue cursor-pointer hover:bg-governor-bay text-white font-medium px-[17px] py-[9px] rounded-md"
				>
					Apply now
				</Link>
			</>
		);

	return (
		<header className="bg-white-80">
			<div className="max-w-5xl w-9/10 mx-auto h-16 flex items-center justify-between">
				<Link href="/">
					<Image
						className="w-20 md:w-32 h-auto"
						src="/images/a2sv-logo2.png"
						alt="A2SV logo image"
						width={128}
						height={32}
					/>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center">{renderNavLinks()}</div>

				{/* Desktop Session Actions */}
				<div className="hidden md:flex items-center gap-2">{renderSessionActions()}</div>

				{/* Mobile Menu */}
				<div className="md:hidden">
					<BurgerMenu>
						<div className="flex flex-col gap-4">{renderNavLinks()}</div>
						<div className="flex flex-col gap-4">{renderSessionActions()}</div>
					</BurgerMenu>
				</div>
			</div>
		</header>
	);
}

export default Header;
