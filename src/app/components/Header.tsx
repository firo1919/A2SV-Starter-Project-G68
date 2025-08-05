import Image from "next/image";

function Header({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<header className="bg-white-80">
			<div className="max-w-5xl w-9/10 mx-auto h-16 flex items-center justify-between">
				<Image
					className="w-20 md:w-32 h-auto"
					src="/images/a2sv-logo2.png"
					alt="A2SV logo image"
					width={128}
					height={32}
				/>

				{children}
			</div>
		</header>
	);
}
export default Header;
