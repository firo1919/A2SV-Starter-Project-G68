import BurgerMenu from "@/app/components/BurgerMenu";
import Header from "@/app/components/Header";
import SignOut from "@/app/components/SignOut";
import UserName from "@/app/components/UserName";
import Link from "next/link";

async function ReviewersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const navlinks = [{ href: "/reviewer/dashboard", label: "Dashboard" }];
	return (
		<div>
			<Header>
				<div className="hidden md:flex items-center">
					{navlinks.map((link) => (
						<Link
							className="font-medium text-oxford-blue mr-8 hover:border-b-2 hover:border-royal-blue"
							key={`${link.href + link.label}`}
							href={link.href}
						>
							{link.label}
						</Link>
					))}
				</div>
				<div className="hidden md:flex gap-6 mr-[26px] items-center">
					<Link href="/reviewer/profile" className="text-sm font-semibold text-[#4F46E5]">
						Your Profile
					</Link>
					<UserName />
					<SignOut />
				</div>

				<div className="md:hidden">
					<BurgerMenu>
						<div className="flex flex-col gap-4">
							{navlinks.map((link) => (
								<Link
									className="font-medium text-oxford-blue mr-8 hover:border-b-2 hover:border-royal-blue"
									key={`${link.href + link.label}`}
									href={link.href}
								>
									{link.label}
								</Link>
							))}
						</div>
						<div className="flex flex-col gap-6 mr-[26px] items-center">
							<Link href="/reviewer/profile" className="text-sm font-semibold text-[#4F46E5]">
								Your Profile
							</Link>
							<UserName />
							<SignOut />
						</div>
					</BurgerMenu>
				</div>
			</Header>
			{children}
		</div>
	);
}
export default ReviewersLayout;
