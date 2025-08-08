"use client";

import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import BurgerMenu from "../../../components/BurgerMenu";

export default function SuccessPage() {
	const router = useRouter();

	const handleGoToLogin = () => {
		router.push("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<Header>
				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-6">
					<nav className="flex items-center space-x-6">
						<a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
							Home
						</a>
						<a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
							About
						</a>
						<a href="/success-stories" className="text-gray-700 hover:text-gray-900 transition-colors">
							Success Stories
						</a>
					</nav>
					<button
						className="px-4 py-1.5 sm:py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
						style={{ backgroundColor: "#4F46E5" }}
					>
						Apply Now
					</button>
				</div>

				{/* Mobile Navigation */}
				<div className="md:hidden">
					<BurgerMenu>
						<nav className="flex flex-col space-y-4">
							<a href="/" className="text-gray-700 hover:text-gray-900 transition-colors py-2">
								Home
							</a>
							<a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors py-2">
								About
							</a>
							<a
								href="/success-stories"
								className="text-gray-700 hover:text-gray-900 transition-colors py-2"
							>
								Success Stories
							</a>
							<button
								className="px-6 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity mt-4"
								style={{ backgroundColor: "#4F46E5" }}
							>
								Apply Now
							</button>
						</nav>
					</BurgerMenu>
				</div>
			</Header>

			{/* Main Content */}
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 sm:p-6">
				<div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-center">
					{/* Success Icon */}
					<div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
						<svg
							width="28"
							height="28"
							className="sm:w-[35px] sm:h-[35px]"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 12L11 14L15 10"
								stroke="#22C55E"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					{/* Success Message */}
					<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Action Successful!</h1>
					<p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
						Your password has been reset. You can now log in with your new password.
					</p>

					{/* Go to Login Button */}
					<button
						onClick={handleGoToLogin}
						className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
						style={{ backgroundColor: "#4F46E5" }}
					>
						Go to Login
					</button>
				</div>
			</div>
		</div>
	);
}
