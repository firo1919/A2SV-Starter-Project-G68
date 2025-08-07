import Image from "next/image";
import Link from "next/link";

function Header({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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

				{children}
			</div>
		</header>
	);
}
export default Header;
