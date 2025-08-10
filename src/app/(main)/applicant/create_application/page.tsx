"use client";
import {
	CodingProfilesFormData,
	codingProfilesSchema,
	EssaysResumeFormData,
	essaysResumeSchema,
	PersonalInfoFormData,
	personalInfoSchema,
} from "@/lib/zod/applicantsSubmitionForm";
import { ApplicationFormData } from "@/types/ApplicationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../../components/Header";
import CodingProfiles from "../../../components/applicant/CodingProfiles";
import EssaysResume from "../../../components/applicant/EssaysResume";
import PersonalInfo from "../../../components/applicant/PersonalInfo";
import { useCreateApplicationMutation } from "@/lib/redux/api/applicationsApiSlice";
import { useGetProfileQuery } from "@/lib/redux/api/profileApiSlice";
import { useSession, signOut } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

type FormStep = "personal" | "coding" | "essays";

export default function ApplicationForm() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState<FormStep>("personal");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [createApplication] = useCreateApplicationMutation();
	const { data: profileResponse } = useGetProfileQuery();
	const { data: session } = useSession();
	const [formData, setFormData] = useState<ApplicationFormData>({
		// Personal Info
		student_id: "",
		school: "",
		degree: "",
		country: "",
		// Coding Profiles
		codeforces_handle: "",
		leetcode_handle: "",
		// Essays & Resume
		essay_about_you: "",
		essay_why_a2sv: "",
		resume: null as File | null,
	});
	const {
		register: registerA,
		handleSubmit: handleSubmitA,
		formState: { errors: errorsA },
	} = useForm<PersonalInfoFormData>({ resolver: zodResolver(personalInfoSchema) });
	const {
		register: registerB,
		handleSubmit: handleSubmitB,
		formState: { errors: errorsB },
	} = useForm<CodingProfilesFormData>({ resolver: zodResolver(codingProfilesSchema) });
	const {
		register: registerC,
		handleSubmit: handleSubmitC,
		formState: { errors: errorsC },
	} = useForm<EssaysResumeFormData>({ resolver: zodResolver(essaysResumeSchema) });

	const steps = [
		{ id: "personal", label: "Personal Info", number: 1 },
		{ id: "coding", label: "Coding Profiles", number: 2 },
		{ id: "essays", label: "Essays & Resume", number: 3 },
	];

	const handleNext = async () => {
		if (currentStep === "personal") {
			await handleSubmitA((data) => {
				onSubmit(data);
				setCurrentStep("coding");
			})();
		} else if (currentStep === "coding") {
			await handleSubmitB((data) => {
				onSubmit(data);
				setCurrentStep("essays");
			})();
		} else if (currentStep === "essays") {
			await handleSubmitC(
				async (data) => {
					await handleFormSubmit(data);
				},
				(errors) => {
					toast.error(
						"Please fill in all required fields correctly. Essays must be at least 50 characters long.",
						{
							draggable: false,
							theme: "colored",
							hideProgressBar: true,
						}
					);
				}
			)();
		}
	};

	const handleBack = () => {
		if (currentStep === "coding") setCurrentStep("personal");
		else if (currentStep === "essays") setCurrentStep("coding");
	};

	const handleFormSubmit = async (data: EssaysResumeFormData) => {
		setIsSubmitting(true);

		// Create the complete form data object
		const finalFormData = {
			...formData,
			essay_about_you: data.essay_about_you,
			essay_why_a2sv: data.essay_why_a2sv,
			resume: data.resume,
		};

		// Create FormData with all the collected form data
		const submissionFormData = new FormData();

		for (const key in finalFormData) {
			const value = finalFormData[key as keyof typeof finalFormData];
			if (value !== null && value !== undefined && value !== "") {
				submissionFormData.append(key, value);
			}
		}

		try {
			// Actually call the API to submit the application
			const result = await createApplication(submissionFormData).unwrap();

			if (result.success) {
				// Show success message and redirect
				toast.success("Application submitted successfully!", {
					draggable: false,
					theme: "colored",
					hideProgressBar: true,
				});
				router.push("/applicant/success");
			} else {
				// Show error message with more details from the backend
				const backendMessage = (result.data as any)?.message || result.message;

				// Check if it's a duplicate application error
				if (backendMessage && backendMessage.includes("already submitted")) {
					toast.info("You already have a submitted application. Redirecting to your application status...", {
						draggable: false,
						theme: "colored",
						hideProgressBar: true,
					});
					// Redirect to the progress page to show application status
					setTimeout(() => {
						router.push("/applicant/progress");
					}, 2000);
				} else {
					toast.error(`Failed to submit application: ${backendMessage}`, {
						draggable: false,
						theme: "colored",
						hideProgressBar: true,
					});
				}
			}
		} catch (error: any) {
			console.error("Error submitting application:", error);
			const errorMessage =
				error?.data?.message ||
				error?.message ||
				"An error occurred while submitting your application. Please try again.";
			toast.error(errorMessage, {
				draggable: false,
				theme: "colored",
				hideProgressBar: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	function onSubmit(data: PersonalInfoFormData | CodingProfilesFormData) {
		if ("student_id" in data) {
			setFormData((prev) => {
				const newData = {
					...prev,
					student_id: data.student_id,
					school: data.school,
					degree: data.degreeProgram,
					country: data.country,
				};
				return newData;
			});
		} else {
			setFormData((prev) => {
				const newData = {
					...prev,
					codeforces_handle: data.codeforces_handle,
					leetcode_handle: data.leetcode_handle,
				};
				return newData;
			});
		}
	}

	const getCurrentStepIndex = () => {
		return steps.findIndex((step) => step.id === currentStep);
	};

	// Get name from profile or session with fallback
	const profileData =
		profileResponse?.success && (profileResponse.data as any)?.data ? (profileResponse.data as any).data : null;
	let userName = profileData?.full_name || (session?.user as any)?.name || "Applicant Name";

	const handleLogout = () => {
		signOut();
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<Header>
				<div className="flex items-center space-x-4">
					<span className="text-gray-700">{userName}</span>
					<p className="text-sm font-semibold text-gray-400 cursor-pointer" onClick={handleLogout}>
						Logout
					</p>
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
							{currentStep === "personal" && <PersonalInfo errors={errorsA} register={registerA} />}
							{currentStep === "coding" && <CodingProfiles errors={errorsB} register={registerB} />}
							{currentStep === "essays" && <EssaysResume errors={errorsC} register={registerC} />}
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
									onClick={handleNext}
									disabled={isSubmitting}
									className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm ${
										isSubmitting
											? "bg-gray-400 text-white cursor-not-allowed"
											: "bg-blue-600 text-white hover:bg-blue-700"
									}`}
								>
									{isSubmitting ? "Submitting..." : "Submit"}
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
			<ToastContainer />
		</div>
	);
}
