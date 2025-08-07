"use client";
import { CodingProfilesFormData, EssaysResumeFormData, PersonalInfoFormData } from "@/lib/zod/applicantsSubmitionForm";
import { ApplicationFormData } from "@/types/ApplicationForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../../../components/Header";
import CodingProfiles from "../../../components/applicant/CodingProfiles";
import EssaysResume from "../../../components/applicant/EssaysResume";
import PersonalInfo from "../../../components/applicant/PersonalInfo";

type FormStep = "personal" | "coding" | "essays";

export default function ApplicationForm() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState<FormStep>("personal");
	const [formData, setFormData] = useState<ApplicationFormData>({
		// Personal Info
		student_id: "",
		school: "",
		degreeProgram: "",
		// Coding Profiles
		codeforces_handle: "",
		leetcode_handle: "",
		github: "",
		// Essays & Resume
		essay_about_you: "",
		essay_why_a2sv: "",
		resume: null as File | null,
	});
	const [isValid, setIsValid] = useState({ personal: false, coding: false, essays: false });

	const steps = [
		{ id: "personal", label: "Personal Info", number: 1 },
		{ id: "coding", label: "Coding Profiles", number: 2 },
		{ id: "essays", label: "Essays & Resume", number: 3 },
	];

	const handleNext = () => {
		if (currentStep === "personal" && isValid.personal) {
			setCurrentStep("coding");
		} else if (currentStep === "coding" && isValid.coding) {
			setCurrentStep("essays");
		} else if (currentStep === "essays" && isValid.essays && isValid.coding && isValid.personal) {
			handleSubmit();
		}
	};

	const handleBack = () => {
		if (currentStep === "coding") setCurrentStep("personal");
		else if (currentStep === "essays") setCurrentStep("coding");
	};

	const handleSubmit = () => {
		console.log(formData);
		const submissionFormData = new FormData();
		for (const key in formData) {
			// @ts-expect-error: formData may contain File type which is not assignable to string, but FormData.append accepts File
			submissionFormData.append(key, formData[key]);
		}
		console.log(submissionFormData);
	};

	const handlePersonalInfoSubmit = (data: PersonalInfoFormData | null) => {
		if (!data) {
			setIsValid((prev) => ({
				...prev,
				personal: false,
			}));
		} else {
			setIsValid((prev) => ({
				...prev,
				personal: true,
			}));
			setFormData((prev) => ({
				...prev,
				student_id: data.student_id,
				school: data.school,
				degreeProgram: data.degreeProgram,
			}));
		}
	};
	const handleCodingProfilesSubmit = (data: CodingProfilesFormData | null) => {
		if (!data) {
			setIsValid((prev) => ({
				...prev,
				coding: false,
			}));
		} else {
			setIsValid((prev) => ({
				...prev,
				coding: true,
			}));
			setFormData((prev) => ({
				...prev,
				codeforces_handle: data.codeforces_handle,
				leetcode_handle: data.leetcode_handle,
				github: data.github,
			}));
		}
	};
	const handleEssaysAndResumesSubmit = (data: EssaysResumeFormData | null) => {
		if (!data) {
			setIsValid((prev) => ({
				...prev,
				essays: false,
			}));
		} else {
			setIsValid((prev) => ({
				...prev,
				essays: true,
			}));
			setFormData((prev) => ({
				...prev,
				essay_about_you: data.essay_about_you,
				essay_why_a2sv: data.essay_why_a2sv,
				resume: data.resume,
			}));
		}
	};

	const getCurrentStepIndex = () => {
		return steps.findIndex((step) => step.id === currentStep);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<Header>
				<div className="flex items-center space-x-4">
					<span className="text-gray-700">John Doe</span>
					<button className="font-semibold text-gray-400 hover:text-gray-600 transition-colors">
						Logout
					</button>
				</div>
			</Header>

			{/* Main Content */}
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 sm:p-6">
				<div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					{/* Form Header */}
					<div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-6 text-center">
						<h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
							Application Form
						</h1>

						{/* Progress Tracker */}
						<div className="mb-6 sm:mb-8">
							{/* Progress Bar */}
							<div className="relative mb-4 sm:mb-6">
								<div className="h-2 bg-gray-200 rounded-full">
									<div
										className="h-2 bg-blue-600 rounded-full transition-all duration-300"
										style={{
											width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%`,
										}}
									/>
								</div>
							</div>

							{/* Steps */}
							<div className="flex items-center justify-between px-2">
								{steps.map((step, index) => {
									const isActive = step.id === currentStep;
									const isCompleted = getCurrentStepIndex() > index;

									return (
										<div key={step.id} className="flex flex-col items-center">
											<div
												className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
													isActive
														? "bg-blue-600 text-white"
														: isCompleted
														? "bg-gray-400 text-white"
														: "bg-gray-300 text-gray-600"
												}`}
											>
												{step.number}
											</div>
											<span
												className={`text-xs mt-1 sm:mt-2 transition-colors duration-300 text-center ${
													isActive
														? "text-blue-600 font-medium"
														: isCompleted
														? "text-gray-400"
														: "text-gray-500"
												}`}
											>
												{step.label}
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Form Content */}
					<div className="px-4 sm:px-8 pb-6 sm:pb-8">
						<div className="min-h-[100px] sm:min-h-[200px]">
							{currentStep === "personal" && <PersonalInfo updateFormData={handlePersonalInfoSubmit} />}
							{currentStep === "coding" && <CodingProfiles updateFormData={handleCodingProfilesSubmit} />}
							{currentStep === "essays" && <EssaysResume updateFormData={handleEssaysAndResumesSubmit} />}
						</div>

						{/* Navigation Buttons */}
						<div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-2 sm:mt-3 pt-2 border-t border-gray-100">
							<button
								onClick={handleBack}
								disabled={currentStep === "personal"}
								className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm ${
									currentStep === "personal"
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								Back
							</button>
							{currentStep === "essays" ? (
								<button
									onClick={handleSubmit}
									className="px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
								>
									Submit
								</button>
							) : (
								<button
									onClick={handleNext}
									className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
								>
									Next: {currentStep === "personal" ? "Coding Profiles" : "Essays & Resume"}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
