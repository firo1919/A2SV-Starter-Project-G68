import Link from "next/link";

export default function SuccessPage() {
	return (
		<div className="min-h-screen bg-gray-50">
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

					<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Action Successful!</h1>
					<p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
						Your password has been reset. You can now log in with your new password.
					</p>

					<Link
						href="/login"
						className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
						style={{ backgroundColor: "#4F46E5" }}
					>
						Go to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
