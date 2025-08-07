"use client";
import { useRef } from "react";

interface EssaysResumeProps {
	formData: {
		aboutSelf: string;
		whyJoin: string;
		resume: File | null;
	};
	updateFormData: (field: string, value: string | File | null) => void;
}

export default function EssaysResume({ formData, updateFormData }: EssaysResumeProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		updateFormData("resume", file);
	};

	const handleChooseFile = () => {
		fileInputRef.current?.click();
	};

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
						value={formData.aboutSelf || ""}
						onChange={(e) => updateFormData("aboutSelf", e.target.value)}
						className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm"
						rows={4}
					/>
				</div>

				<div>
					<label htmlFor="whyJoin" className="block text-sm font-medium text-gray-700 mb-2">
						Why do you want to Join us?
					</label>
					<textarea
						id="whyJoin"
						value={formData.whyJoin}
						onChange={(e) => updateFormData("whyJoin", e.target.value)}
						className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm"
						rows={4}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
						<span className="text-sm text-gray-500">Upload your resume</span>
						<button
							type="button"
							onClick={handleChooseFile}
							className="px-2 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs"
						>
							Choose File
						</button>
					</div>
					<input
						ref={fileInputRef}
						type="file"
						accept=".pdf,.doc,.docx"
						onChange={handleFileChange}
						className="hidden"
					/>
					{formData.resume ? (
						<p className="text-sm text-green-600 mt-2">✓ {formData.resume.name}</p>
					) : (
						<p className="text-sm text-red-500 mt-2">*no file chosen*</p>
					)}
				</div>
			</div>
		</div>
	);
}
