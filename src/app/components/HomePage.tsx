import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
	return (
		<div>
			<div className="relative mb-5 overflow-hidden">
				<Image
					className="w-full h-60 md:h-80 lg:h-96 object-cover"
					src="/images/HomePage-image.png"
					alt="HomePage-Image"
					width={1200}
					height={400}
					priority
				/>
				<div className="absolute left-0 top-0 bg-black/40 flex flex-col justify-center p-4 sm:p-5 md:p-6 lg:p-8 w-full h-full">
					<div className="max-w-4xl px-4 sm:px-6 md:px-8 lg:px-28 xl:px-32">
						<h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
							Forge Your Future in Tech
						</h1>
						<p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-6 max-w-2xl leading-relaxed">
							Join an elite community of Africa&apos;s brightest minds, and get fast-tracked to a software
							engineering career at the world&apos;s leading tech companies.
						</p>
						<Link href="/login">
							<button className="bg-indigo-800 cursor-pointer hover:bg-indigo-900 text-white px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 rounded-md font-semibold transition-colors text-sm sm:text-base">
								Start Your Application
							</button>
						</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-3 md:gap-10 mb-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-7 justify-center items-center">
				<Image
					src="/images/google.png"
					alt="Google-Image"
					width={170}
					height={60}
					className="w-32 sm:w-40 md:w-[200px] md:h-[50px] h-auto"
				/>
				<Image
					src="/images/amazon.png"
					alt="Amazon-Image"
					width={170}
					height={60}
					className="w-32 sm:w-40 md:w-[200px] md:h-[50px] h-auto"
				/>
			</div>

			<div id="thejourney" className="bg-white">
				<div className="w-full max-w-5xl mx-auto py-8 sm:py-10 px-4 sm:px-6 md:px-8">
					<div className="flex flex-col items-center text-center mb-8 sm:mb-12">
						<h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3 text-black">
							Your Journey to Silicon Valley
						</h1>
						<p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-12">
							A proven path from learning to leadership
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="flex items-start gap-3 sm:gap-4">
							<Image
								className="w-10 h-10 flex-shrink-0"
								src="/images/icon1.png"
								alt="icon"
								width={40}
								height={40}
							/>
							<div className="flex-1 min-w-0">
								<h1 className="text-black font-bold text-[15px] mb-3 text-left">Phase1: Foundations</h1>
								<p className="text-gray-500 text-sm text-left">
									Master data structures, algorithms, and problem-solving techniques in an intensive 3
									month bootcamp
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 sm:gap-4">
							<Image
								className="w-10 h-10 flex-shrink-0"
								src="/images/icon2.png"
								alt="icon"
								width={40}
								height={40}
							/>
							<div className="flex-1 min-w-0">
								<h1 className="text-black font-bold text-[15px] mb-3 text-left">
									Phase2: Real World Projects
								</h1>
								<p className="text-gray-500 text-sm text-left">
									Apply your skills to build complex projects, collaborate in teams, and prepare for
									technical interviews
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3 sm:gap-4">
							<Image
								className="w-10 h-10 flex-shrink-0"
								src="/images/icon3.png"
								alt="icon"
								width={40}
								height={40}
							/>
							<div className="flex-1 min-w-0">
								<h1 className="text-black font-bold text-[15px] mb-3 text-left">
									Phase3: Internship Placement
								</h1>
								<p className="text-gray-500 text-sm text-left">
									We help you secure internships at top global tech companies to gain valuable
									experience.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 sm:gap-4">
							<Image
								className="w-10 h-10 flex-shrink-0"
								src="/images/icon4.png"
								alt="icon"
								width={40}
								height={40}
							/>
							<div className="flex-1 min-w-0">
								<h1 className="text-black font-bold text-[15px] mb-3 text-left">
									Phase4: Full-Time Conversion
								</h1>
								<p className="text-gray-500 text-sm text-left">
									Excel in your internship and convert it into a full time offer, launching your
									global career.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				id="about"
				className="flex flex-col lg:flex-row gap-5 mb-12 sm:mb-15 px-4 sm:px-6 md:px-8 lg:px-28 xl:px-32 py-8 sm:py-10 justify-center items-center"
			>
				<div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
					<h1 className="text-black font-bold text-lg sm:text-xl md:text-2xl mb-4">
						Built by Engineers, for Engineers
					</h1>
					<p className="text-gray-500 text-sm sm:text-base">
						A2SV is not just a program, it&apos;s a community. We&apos;re on a mission to identify
						Africa&apos;s most brilliant minds and provide them with the tools to solve humanity&apos;s
						greatest challenges.
					</p>
				</div>
				<div className="lg:w-1/2 flex justify-center">
					<Image
						className="h-auto max-w-md lg:max-w-lg"
						src="/images/main-image.png"
						alt="main-image"
						width={420}
						height={300}
					/>
				</div>
			</div>

			<div id="testimonials" className="bg-white/70 w-full py-8 sm:py-10 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
				<h1 className="text-black font-bold text-lg sm:text-xl md:text-2xl text-center mb-6">
					Hear from Our Alumni
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
					<div className="bg-white text-sm py-6 sm:py-7 px-4 sm:px-7 rounded-lg shadow-sm">
						<p className="text-black/80 mb-4 sm:mb-5">
							&quot;A2SV completely changed the trajectory of my career. The training is intense, but the
							community and the opportunities are unparalleled. I&apos;m now at my dream company, and I
							owe it all to A2SV.&quot;
						</p>
						<div className="flex items-center">
							<Image
								className="mr-2 sm:mr-3 rounded-full w-10 h-10 sm:w-11 sm:h-11"
								src="/images/Profile1.png"
								alt="Profile image"
								width={43}
								height={43}
							/>
							<div>
								<h1 className="text-black font-bold text-sm sm:text-base">Abel Tadess</h1>
								<p className="text-gray-400 text-xs sm:text-sm">Software Engineer, Google</p>
							</div>
						</div>
					</div>

					<div className="bg-white text-sm py-6 sm:py-7 px-4 sm:px-7 rounded-lg shadow-sm">
						<p className="text-black/80 mb-4 sm:mb-5">
							&quot;The problem-solving skills I learned at A2SV are immense. The mentors push you to be
							your best, and you&apos;re surrounded by people who are just as passionate as you are&quot;
						</p>
						<div className="flex items-center">
							<Image
								className="mr-2 sm:mr-3 rounded-full w-10 h-10 sm:w-11 sm:h-11"
								src="/images/Profile2.png"
								alt="Profile image"
								width={43}
								height={43}
							/>
							<div>
								<h1 className="text-black font-bold text-sm sm:text-base">Bethlehem Tadesse</h1>
								<p className="text-gray-400 text-xs sm:text-sm">Software Engineer, Amazon</p>
							</div>
						</div>
					</div>

					<div className="bg-white text-sm py-6 sm:py-7 px-4 sm:px-7 rounded-lg shadow-sm md:col-span-2 lg:col-span-1">
						<p className="text-black/80 mb-4 sm:mb-5">
							&quot;A2SV is more than a bootcamp. It&apos;s a family that supports you long after
							you&apos;ve graduated. The network you build here is for life.&quot;
						</p>
						<div className="flex items-center">
							<Image
								className="mr-2 sm:mr-3 rounded-full w-10 h-10 sm:w-11 sm:h-11"
								src="/images/Profile3.png"
								alt="Profile image"
								width={43}
								height={43}
							/>
							<div>
								<h1 className="text-black font-bold text-sm sm:text-base">Caleb Aleayehu</h1>
								<p className="text-gray-400 text-xs sm:text-sm">Software Engineer, Google</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-indigo-900 py-8 sm:py-10 md:py-20 w-full text-center px-4 sm:px-6 md:px-8">
				<h1 className="text-white text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-5">Ready to change your life?</h1>
				<p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg mx-auto mb-6 sm:mb-8">
					The next application cycle is now open. Take the first step towards your dream career.
				</p>
				<Link href="/login">
					<button className="text-indigo-900 cursor-pointer bg-white hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-md font-semibold transition-colors text-sm sm:text-base">
						Apply Now
					</button>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
