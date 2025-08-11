"use client";

import { useAddReviewMutation } from "@/lib/redux/api/reviewsApiSlice";
import { AddReviewSchema, ReviewSchema } from "@/lib/zod/reviewer/AddReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import { CustomButton } from "./custom-button";

interface ReviewFormProps {
	applicationId: string;
	currentActivityCheckNotes?: string;
	currentInterviewNotes?: string;
	currentResumeScore?: number;
	currentEssay1Score?: number;
	currentEssay2Score?: number;
	currentTechnicalInterviewScore?: number;
	currentBehavioralInterviewScore?: number;
}

export default function ReviewForm({
	applicationId,
	currentActivityCheckNotes = "",
	currentInterviewNotes = "",
	currentResumeScore = 0,
	currentEssay1Score = 0,
	currentEssay2Score = 0,
	currentTechnicalInterviewScore = 0,
	currentBehavioralInterviewScore = 0,
}: ReviewFormProps) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(AddReviewSchema),
		defaultValues: {
			activity_check_notes: currentActivityCheckNotes,
			resume_score: currentResumeScore,
			essay_why_a2sv_score: currentEssay1Score,
			essay_about_you_score: currentEssay2Score,
			technical_interview_score: currentTechnicalInterviewScore,
			behavioral_interview_score: currentBehavioralInterviewScore,
			interview_notes: currentInterviewNotes,
		},
	});
	const router = useRouter();
	const [addReview, { isLoading }] = useAddReviewMutation();

	async function onSubmit(data: ReviewSchema) {
		try {
			const response = await addReview({ id: applicationId, review: data });
			if (!response.data?.data || !response.data.success) {
				throw response.error;
			}
			toast("Review successfull", { draggable: false, theme: "colored", hideProgressBar: true, type: "success" });
			router.refresh();
		} catch (error) {
			toast("Registration failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			console.log(error);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<h3 className="text-xl font-semibold text-gray-900 mb-4">Review Details</h3>

			<div>
				<label htmlFor="activityCheckNotes" className="block text-sm font-medium text-gray-700 mb-1">
					Activity Check Notes
				</label>
				<textarea
					id="activityCheckNotes"
					placeholder="Enter your activity check notes here..."
					rows={5}
					{...register("activity_check_notes")}
					className={`resize-none flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
						errors.activity_check_notes?.message ? "border-red-500" : "border-gray-200"
					}`}
				/>
				{errors.activity_check_notes && (
					<p className="text-red-600 text-sm">{errors.activity_check_notes.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="activityCheckNotes" className="block text-sm font-medium text-gray-700 mb-1">
					Interview Notes
				</label>
				<textarea
					id="activityCheckNotes"
					placeholder="Enter your interview notes here..."
					rows={5}
					{...register("interview_notes")}
					className={`resize-none flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
						errors.interview_notes?.message ? "border-red-500" : "border-gray-200"
					}`}
				/>
				{errors.interview_notes && <p className="text-red-600 text-sm">{errors.interview_notes.message}</p>}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label htmlFor="resumeScore" className="block text-sm font-medium text-gray-700 mb-1">
						Resume Score (0-100)
					</label>
					<input
						type="number"
						id="resumeScore"
						{...register("resume_score")}
						min="0"
						max="100"
						placeholder="e.g., 85"
						className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
							errors.resume_score?.message ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{errors.resume_score && <p className="text-red-600 text-sm">{errors.resume_score.message}</p>}
				</div>
				<div>
					<label htmlFor="essay2Score" className="block text-sm font-medium text-gray-700 mb-1">
						Essay 1 (why a2sv) Score (0-100)
					</label>
					<input
						type="number"
						id="essay2Score"
						{...register("essay_why_a2sv_score")}
						min="0"
						max="100"
						placeholder="e.g., 90"
						className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
							errors.essay_why_a2sv_score?.message ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{errors.essay_why_a2sv_score && (
						<p className="text-red-600 text-sm">{errors.essay_why_a2sv_score.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="essay1Score" className="block text-sm font-medium text-gray-700 mb-1">
						Essay 2 (about you) Score (0-100)
					</label>
					<input
						type="number"
						id="essay1Score"
						{...register("essay_about_you_score")}
						min="0"
						max="100"
						placeholder="e.g., 90"
						className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
							errors.essay_about_you_score?.message ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{errors.essay_about_you_score && (
						<p className="text-red-600 text-sm">{errors.essay_about_you_score.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="technical" className="block text-sm font-medium text-gray-700 mb-1">
						Technical interview Score (0-100)
					</label>
					<input
						type="number"
						id="technical"
						{...register("technical_interview_score")}
						min="0"
						max="100"
						placeholder="e.g., 90"
						className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
					/>
					{errors.technical_interview_score && (
						<p className="text-red-600 text-sm">{errors.technical_interview_score.message}</p>
					)}
				</div>
				<div className="col-span-2">
					<label htmlFor="behavioral" className="block text-sm font-medium text-gray-700 mb-1">
						Behavioral interview Score (0-100)
					</label>
					<input
						type="number"
						id="behavioral"
						{...register("behavioral_interview_score")}
						min="0"
						max="100"
						placeholder="e.g., 90"
						className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
							errors.behavioral_interview_score?.message ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{errors.behavioral_interview_score && (
						<p className="text-red-600 text-sm">{errors.behavioral_interview_score.message}</p>
					)}
				</div>
			</div>
			<CustomButton type="submit" variant="blue" className="w-full">
				{isLoading ? "Saving..." : "Save & Submit Review"}
			</CustomButton>
			{isLoading && (
				<div className="absolute top-0 left-0 w-full h-full bg-athens-gray opacity-50 flex items-center justify-center">
					<ImSpinner className="text-7xl animate-spin" />
				</div>
			)}
			<ToastContainer />
		</form>
	);
}
