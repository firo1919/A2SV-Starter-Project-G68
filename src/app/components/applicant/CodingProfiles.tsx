import { useState, useEffect } from "react";
import { codingProfilesSchema, type CodingProfilesFormData } from "../../../lib/validation";

interface CodingProfilesProps {
	formData: {
		codeforces: string;
		leetcode: string;
		github: string;
	};
	updateFormData: (field: string, value: string) => void;
	forceValidate?: boolean;
}

export default function CodingProfiles({ formData, updateFormData, forceValidate = false }: CodingProfilesProps) {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	// Function to validate URL format
	const isValidUrl = (url: string): boolean => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const validateField = (field: string, value: string) => {
		// Simple validation - check if field is empty
		if (!value || value.trim() === "") {
			const fieldName = field === "codeforces" ? "Codeforces" : field === "leetcode" ? "LeetCode" : "GitHub";
			setErrors((prev) => ({ ...prev, [field]: `${fieldName} is required` }));
		} else if (!isValidUrl(value)) {
			// Check if it's a valid URL
			const fieldName = field === "codeforces" ? "Codeforces" : field === "leetcode" ? "LeetCode" : "GitHub";
			setErrors((prev) => ({ ...prev, [field]: `${fieldName} must be a valid URL` }));
		} else {
			// Clear error if field has valid URL
			setErrors((prev) => ({ ...prev, [field]: "" }));
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

			// Simple validation - check if field is empty or invalid URL
			if (!formData[field as keyof typeof formData]) {
				const fieldName = field === "codeforces" ? "Codeforces" : field === "leetcode" ? "LeetCode" : "GitHub";
				newErrors[field] = `${fieldName} is required`;
			} else if (!isValidUrl(formData[field as keyof typeof formData])) {
				const fieldName = field === "codeforces" ? "Codeforces" : field === "leetcode" ? "LeetCode" : "GitHub";
				newErrors[field] = `${fieldName} must be a valid URL`;
			}
		});

		// Set all errors at once
		setErrors(newErrors);
	};

	const handleBlur = (field: string) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		validateField(field, formData[field as keyof typeof formData]);
	};

	// Force validation when forceValidate is true
	useEffect(() => {
		if (forceValidate) {
			validateAllFields();
		}
	}, [forceValidate]);

	return (
		<div>
			<h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Coding Profiles</h2>
			<div className="space-y-4 sm:space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
					<div>
						<label htmlFor="codeforces" className="block text-sm font-medium text-gray-700 mb-2">
							Codeforces
						</label>
						<input
							type="text"
							id="codeforces"
							value={formData.codeforces}
							onChange={(e) => handleInputChange("codeforces", e.target.value)}
							onBlur={() => handleBlur("codeforces")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.codeforces ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.codeforces && <p className="text-red-500 text-xs mt-1">{errors.codeforces}</p>}
					</div>
					<div>
						<label htmlFor="leetcode" className="block text-sm font-medium text-gray-700 mb-2">
							LeetCode
						</label>
						<input
							type="text"
							id="leetcode"
							value={formData.leetcode}
							onChange={(e) => handleInputChange("leetcode", e.target.value)}
							onBlur={() => handleBlur("leetcode")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.leetcode ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.leetcode && <p className="text-red-500 text-xs mt-1">{errors.leetcode}</p>}
					</div>
				</div>
				<div>
					<label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
						GitHub
					</label>
					<input
						type="text"
						id="github"
						value={formData.github}
						onChange={(e) => handleInputChange("github", e.target.value)}
						onBlur={() => handleBlur("github")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
							errors.github ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{errors.github && <p className="text-red-500 text-xs mt-1">{errors.github}</p>}
				</div>
			</div>
		</div>
	);
}
