import React from "react";
import Link from "next/link";
// import { ExternalLink, FileText, User, GraduationCap } from 'lucide-react'
// // import { Badge } from '@/components/ui/badge'

// interface ProfileData {
//   success: boolean
//   data: {
//     id: string
//     status: string
//     school: string
//     student_id: string
//     country: string
//     degree: string
//     leetcode_handle: string
//     codeforces_handle: string
//     essay_why_a2sv: string
//     essay_about_you: string
//     resume_url: string
// submitted_at: string
// updated_at: string
//   }
//   message: string
// }

// interface ApplicantProfileProps {
//   profileData: ProfileData
// }

const ApplicantProfile = () => {
	// const { data } = profileData

	return (
		<div className="space-y-6 border border-none bg-white w-180 h-105 py-5 px-4 ml-25 mt-6  mb-9">
			<div className="flex items-center gap-2 mb-4">
				<h2 className="text-xl font-semibold text-gray-900 mb-3">Applicant Profile</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
				<div className="space-y-1">
					<p className="text-sm text-gray-500">School</p>
					<div className="flex items-center gap-2">
						<h3 className="font-medium text-black text-sm">Addis Ababa Institute of technology</h3>
					</div>
				</div>
				<div className="space-y-1">
					<p className="text-sm text-gray-500">Degree Program</p>
					<h3 className="font-medium text-black text-sm">Software Engineering</h3>
				</div>
			</div>

			<div className="mb-5">
				<p className="text-sm font-medium text-gray-700">Coding Profiles</p>
				<div className="flex gap-2">
					<Link
						href={"#"}
						className="inline-flex items-center gap-1 py-1 text-[13px] text-purple-900  "
						target="_blank"
					>
						LeetCode
					</Link>
					<Link
						href={"#"}
						className="inline-flex items-center gap-1 py-2 text-[13px] text-purple-900 "
						target="_blank"
					>
						Codeforces
					</Link>
				</div>
			</div>

			<div className="mb-5">
				<p className="text-sm font-medium text-gray-700">Essay 1: Tell me about yourself?</p>
				<div className="">
					<p className="text-sm text-black ">i am passionate about solving complex problems</p>
				</div>
			</div>

			<div className="mb-5">
				<p className="text-sm font-medium text-gray-700">Essay 2: Why do you want to join A2SV?</p>
				<div className="">
					<p className="text-sm text-black ">
						i want to join because I am sure it will help to me improve my problem solving skill
					</p>
				</div>
			</div>

			<div className="mb-8">
				<p className="text-sm font-medium text-gray-700">Resume</p>
				<Link
					href={"#"}
					className="inline-flex items-center gap-1 py-2 text-[13px] text-purple-900"
					target="_blank"
				>
					View Resume.pdf
				</Link>
			</div>
		</div>
	);
};

export default ApplicantProfile;

// import { Props } from 'next/script'
// import React from 'react'
// import Link from 'next/link'

// type ProfileData = {
//   success: boolean,
//   data: {
//     id: string,
//     status: string,
//     school: string,
//     student_id: string,
//     country: string,
//     degree: string,
//     leetcode_handle: string,
//     codeforces_handle: string,
//     essay_why_a2sv: string,
//     essay_about_you: string,
//     resume_url: string,
//     submitted_at: "2025-08-07T12:31:20.510Z",
//     updated_at: "2025-08-07T12:31:20.510Z"
//   },
//   message: "string"
// }

// const ApplicantProfile = ({ProfileData}:Props) => {
//   return (
//     <div className="bg-white text-black py-5 px-4 w-100 h-70">
//       <h1 className="font-bold">Applicant Profile</h1>
//       <div className="flex gap-7">
//         <div className="">
//             <p className="text-gray-700">School</p>
//             <h3>{ProfileData.data.school} </h3>
//         </div>
//         <div className="">
//             <p className="text-gray-700">Degree Program</p>
//             <h3>{ProfileData.data.degree}</h3>
//         </div>
//       </div>

//       <div className="">
//         <p>Coding Profiles</p>
//         <div className="flex">
//             <Link className="text-purple-900 cursor-pointer" href={ProfileData.data.leetcode_handle}> LeetCode</Link>
//             <Link className="text-purple-900 cursor-pointer" href={ProfileData.data.codeforces_handle}> Codeforces </Link>
//         </div>
//       </div>

//       <div className="text-gray-300">
//         <p>Essay 1: Tell me about your self?</p>
//         <p>{ProfileData.data.essay_about_you}</p>
//       </div>

//       <div className="text-gray-300">
//         <p>Essay 2: why do you want to join as?</p>
//         <p>{ProfileData.data.essay_why_a2sv}</p>
//       </div>

//       <div className="">
//         <p>Resume</p>
//         <Link className="text-purple-900 cursor-pointer" href={ProfileData.data.resume_url}>View Resume.pdf</Link>
//       </div>
//     </div>
//   )
// }

// export default ApplicantProfile
