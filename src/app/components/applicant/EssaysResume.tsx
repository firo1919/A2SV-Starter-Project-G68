"use client";
import { EssaysResumeFormData } from "@/lib/zod/applicantsSubmitionForm";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
	register: UseFormRegister<EssaysResumeFormData>;
	errors: FieldErrors<EssaysResumeFormData>;
}

export default function EssaysResume({ register, errors }: Props) {
	const [resume, setResume] = useState("");

	// Function to handle file input change
	// This is used to update the resume state when a file is selected
	function onChangeResume(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files ? e.target.files[0] : null;
		const fileName = file ? file.name : "No file chosen";
		setResume(fileName);
	}

	return (
		<div>
			<h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Essays & Resume</h2>
			<p className="text-gray-600 mb-4 sm:mb-6">Tell us about yourself.</p>

			<div className="space-y-4 sm:space-y-6">
				<div>
					<label htmlFor="aboutSelf" className="block text-sm font-medium text-gray-700 mb-2">
						Tell us about yourself.
					</label>
					<textarea
						id="aboutSelf"
						{...register("essay_about_you")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm ${
							errors.essay_about_you?.message ? "border-red-500" : "border-gray-200"
						}`}
						rows={4}
					/>
					{errors.essay_about_you && <p className="text-red-600 text-sm">{errors.essay_about_you.message}</p>}
				</div>

				<div>
					<label htmlFor="whyJoin" className="block text-sm font-medium text-gray-700 mb-2">
						Why do you want to Join us?
					</label>
					<textarea
						id="whyJoin"
						{...register("essay_why_a2sv")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm ${
							errors.essay_why_a2sv?.message ? "border-red-500" : "border-gray-200"
						}`}
						rows={4}
					/>
					{errors.essay_why_a2sv && <p className="text-red-600 text-sm">{errors.essay_why_a2sv.message}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
						<span className="text-sm text-gray-500">Upload your resume</span>
						<label
							htmlFor="resume-input"
							className="px-2 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs"
						>
							Choose File
						</label>
					</div>
					<input
						id="resume-input"
						className="hidden"
						type="file"
						accept=".pdf,.doc,.docx"
						{...register("resume", {
							onChange: (e) => onChangeResume(e),
						})}
					/>
					{resume ? (
						<p className="text-sm text-green-600 mt-2">✓ {resume}</p>
					) : (
						<p className="text-sm text-red-500 mt-2">*no file chosen*</p>
					)}
					{typeof errors.resume?.message === "string" && (
						<p className="text-red-600 text-sm">{errors.resume.message}</p>
					)}
				</div>
			</div>
		</div>
	);
}
