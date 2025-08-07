"use client";
import { useRef, useState, useEffect } from "react";
import { essaysResumeSchema, type EssaysResumeFormData } from "../../../lib/validation";

interface EssaysResumeProps {
	formData: {
		aboutSelf: string;
		whyJoin: string;
		resume: File | null;
	};
	updateFormData: (field: string, value: string | File | null) => void;
	forceValidate?: boolean;
}

export default function EssaysResume({ formData, updateFormData, forceValidate = false }: EssaysResumeProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	const validateField = (field: string, value: string | File | null) => {
		// Simple validation - check if field is empty
		if (field === "aboutSelf" || field === "whyJoin") {
			if (!value || (typeof value === "string" && value.trim() === "")) {
				const fieldName = field === "aboutSelf" ? "About yourself" : "Why you want to join";
				setErrors((prev) => ({ ...prev, [field]: `${fieldName} is required` }));
			} else {
				setErrors((prev) => ({ ...prev, [field]: "" }));
			}
		} else if (field === "resume") {
			if (!value) {
				setErrors((prev) => ({ ...prev, [field]: "Resume file is required" }));
			} else {
				setErrors((prev) => ({ ...prev, [field]: "" }));
			}
		}
	};

	const handleInputChange = (field: string, value: string) => {
		updateFormData(field, value);
		if (touched[field]) {
			validateField(field, value);
		}
	};

	const validateAllFields = () => {
		const newErrors: Record<string, string> = {};

		Object.keys(formData).forEach((field) => {
			setTouched((prev) => ({ ...prev, [field]: true }));

			// Simple validation - check if field is empty
			if (field === "aboutSelf" || field === "whyJoin") {
				const value = formData[field as keyof typeof formData];
				if (!value || (typeof value === "string" && value.trim() === "")) {
					const fieldName = field === "aboutSelf" ? "About yourself" : "Why you want to join";
					newErrors[field] = `${fieldName} is required`;
				}
			} else if (field === "resume") {
				if (!formData.resume) {
					newErrors[field] = "Resume file is required";
				}
			}
		});

		// Set all errors at once
		setErrors(newErrors);
	};

	const handleBlur = (field: string) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		validateField(field, formData[field as keyof typeof formData]);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		updateFormData("resume", file);
		if (file) {
			validateField("resume", file);
		}
	};

	const handleChooseFile = () => {
		fileInputRef.current?.click();
	};

	// Force validation when forceValidate is true
	useEffect(() => {
		if (forceValidate) {
			validateAllFields();
		}
	}, [forceValidate]);

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
						onChange={(e) => handleInputChange("aboutSelf", e.target.value)}
						onBlur={() => handleBlur("aboutSelf")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm ${
							errors.aboutSelf ? "border-red-500" : "border-gray-200"
						}`}
						rows={4}
					/>
					{errors.aboutSelf && <p className="text-red-500 text-xs mt-1">{errors.aboutSelf}</p>}
				</div>

				<div>
					<label htmlFor="whyJoin" className="block text-sm font-medium text-gray-700 mb-2">
						Why do you want to Join us?
					</label>
					<textarea
						id="whyJoin"
						value={formData.whyJoin}
						onChange={(e) => handleInputChange("whyJoin", e.target.value)}
						onBlur={() => handleBlur("whyJoin")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm ${
							errors.whyJoin ? "border-red-500" : "border-gray-200"
						}`}
						rows={4}
					/>
					{errors.whyJoin && <p className="text-red-500 text-xs mt-1">{errors.whyJoin}</p>}
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
					{errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
				</div>
			</div>
		</div>
	);
}
