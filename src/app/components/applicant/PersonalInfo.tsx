import { useState, useEffect } from "react";
import { personalInfoSchema, type PersonalInfoFormData } from "../../../lib/validation";

interface PersonalInfoProps {
	formData: {
		idNumber: string;
		school: string;
		degreeProgram: string;
	};
	updateFormData: (field: string, value: string) => void;
	forceValidate?: boolean;
}

export default function PersonalInfo({ formData, updateFormData, forceValidate = false }: PersonalInfoProps) {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	const validateField = (field: string, value: string) => {
		// Simple validation - just check if field is empty
		if (!value || value.trim() === "") {
			const fieldName =
				field === "idNumber" ? "ID Number" : field === "school" ? "School/University" : "Degree Program";
			setErrors((prev) => ({ ...prev, [field]: `${fieldName} is required` }));
		} else {
			// Clear error if field has value
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

			// Simple validation - just check if field is empty
			if (!formData[field as keyof typeof formData]) {
				const fieldName =
					field === "idNumber" ? "ID Number" : field === "school" ? "School/University" : "Degree Program";
				newErrors[field] = `${fieldName} is required`;
			}
			// Remove Zod validation for filled fields
		});

		// Set all errors at once
		setErrors(newErrors);
	};

	// Get error for a field - shows error if field is touched and has error
	const getFieldError = (field: string) => {
		return touched[field] && errors[field] ? errors[field] : "";
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
			<h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Personal Information</h2>
			<div className="space-y-4 sm:space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
					<div>
						<label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
							ID Number
						</label>
						<input
							type="text"
							id="idNumber"
							value={formData.idNumber}
							onChange={(e) => handleInputChange("idNumber", e.target.value)}
							onBlur={() => handleBlur("idNumber")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								getFieldError("idNumber") ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{getFieldError("idNumber") && (
							<p className="text-red-500 text-xs mt-1">{getFieldError("idNumber")}</p>
						)}
					</div>
					<div>
						<label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
							School / University
						</label>
						<input
							type="text"
							id="school"
							value={formData.school}
							onChange={(e) => handleInputChange("school", e.target.value)}
							onBlur={() => handleBlur("school")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								getFieldError("school") ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{getFieldError("school") && (
							<p className="text-red-500 text-xs mt-1">{getFieldError("school")}</p>
						)}
					</div>
				</div>
				<div>
					<label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700 mb-2">
						Degree Program
					</label>
					<input
						type="text"
						id="degreeProgram"
						value={formData.degreeProgram}
						onChange={(e) => handleInputChange("degreeProgram", e.target.value)}
						onBlur={() => handleBlur("degreeProgram")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
							getFieldError("degreeProgram") ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{getFieldError("degreeProgram") && (
						<p className="text-red-500 text-xs mt-1">{getFieldError("degreeProgram")}</p>
					)}
				</div>
			</div>
		</div>
	);
}
