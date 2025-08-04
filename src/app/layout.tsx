import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Application Platform",
	description: "An application platform for A2SV",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
