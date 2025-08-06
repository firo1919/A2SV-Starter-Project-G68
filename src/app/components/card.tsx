import React from "react";

export default function Card() {
	return (
		<div className="m-4 min-w-[280px]">
			<div className="shadow-xl bg-white p-4 rounded-md">
				<h1 className="flex-1/2 text-lg font-semibold mb-5">Recent Activity</h1>
				<div className="flex gap-2">
					<img src="./images/image.png" alt="Illustration" className="w-10 h-10 object-cover rounded-md" />
					<div>
						<h2 className="text-sm font-stretch-ultra-expanded">Application Submitted</h2>
						<p className="text-xs text-gray-400">October 26, 2023</p>
					</div>
				</div>
				<div className="flex gap-2">
					<img src="./images/img2.png" alt="Illustration" className="w-10 h-10 object-cover rounded-md" />
					<div>
						<h2 className="text-sm font-stretch-ultra-expanded">Interview Scheduled</h2>
						<p className="text-xs text-gray-400">November 5, 2023</p>
					</div>
				</div>
			</div>
			<div className="shadow-xl bg-white p-4 mt-4 rounded-md">
				<h1 className="text-lg font-semibold mb-2">Important Updates</h1>
				<div className="flex items-center">
					<> </>
				</div>
				<div>
					<p className="text-sm font-light ">
						There are no new updates at this time. We will notify you by email when your application status
						changes.
					</p>
				</div>
			</div>
			<div className="shadow-xl bg-blue-600 p-4 mt-4 rounded-md">
				<h1 className="text-lg font-semibold mb-5 text-2xl text-white">Get Ready for the Interview!</h1>
				<div className="flex items-center gap-2">
					<> </>
				</div>
				<div>
					<h2 className="text-sm font-stretch-ultra-expanded text-2xl text-white">
						While you wait, it's a great time to prepare. Practice your problem-solving skills on platforms
						like LeetCode and Codeforces.→
					</h2>
					<p className="text-sm font-bold text-white "> Read our interview prep guide → </p>
				</div>
			</div>
		</div>
	);
}
