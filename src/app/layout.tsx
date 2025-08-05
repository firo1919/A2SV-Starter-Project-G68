import AuthProvider from "@/providers/AuthProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

export const metadata: Metadata = {
	title: "Application Platform",
	description: "An application platform for A2SV",
};

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600"],
});

const inter = Inter({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={`${poppins.variable} ${inter.variable}`}>{children}</body>
			</AuthProvider>
		</html>
	);
}
