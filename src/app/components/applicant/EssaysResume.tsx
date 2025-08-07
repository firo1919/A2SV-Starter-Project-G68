"use client";
import { EssaysResumeFormData, essaysResumeSchema } from "@/lib/zod/applicantsSubmitionForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
	updateFormData: (data: EssaysResumeFormData | null) => void;
}

export default function EssaysResume({ updateFormData }: Props) {
	const {
		register,
		trigger,
		getValues,
		watch,
		formState: { errors },
	} = useForm<EssaysResumeFormData>({ resolver: zodResolver(essaysResumeSchema) });
	useEffect(() => {
		const subscription = watch(async () => {
			const isValid = await trigger();
			if (isValid) {
				let data = getValues();
				const fileList = getValues("resume"); // FileList
				const resume = fileList?.[0]; //
				data = {
					...data,
					resume: resume,
				};
				updateFormData(data);
			} else {
				updateFormData(null);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, trigger, getValues, updateFormData]);
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
						<button
							type="button"
							className="px-2 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs"
						>
							Choose File
						</button>
					</div>
					<input type="file" accept=".pdf,.doc,.docx" {...register("resume")} />
					{typeof errors.resume?.message === "string" && (
						<p className="text-red-600 text-sm">{errors.resume.message}</p>
					)}
				</div>
			</div>
		</div>
	);
}
