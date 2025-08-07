import { CodingProfilesFormData, codingProfilesSchema } from "@/lib/zod/applicantsSubmitionForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
interface Props {
	updateFormData: (data: CodingProfilesFormData | null) => void;
}

export default function CodingProfiles({ updateFormData }: Props) {
	const {
		register,
		trigger,
		getValues,
		watch,
		formState: { errors },
	} = useForm<CodingProfilesFormData>({ resolver: zodResolver(codingProfilesSchema) });
	console.log("validations errors", errors);
	useEffect(() => {
		const subscription = watch(async () => {
			const isValid = await trigger();
			if (isValid) {
				const data = getValues();
				updateFormData(data);
			} else {
				updateFormData(null);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, trigger, getValues, updateFormData]);
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
							{...register("codeforces_handle")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.codeforces_handle?.message ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.codeforces_handle && (
							<p className="text-red-600 text-sm">{errors.codeforces_handle.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="leetcode" className="block text-sm font-medium text-gray-700 mb-2">
							LeetCode
						</label>
						<input
							type="text"
							id="leetcode"
							{...register("leetcode_handle")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.leetcode_handle?.message ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.leetcode_handle && (
							<p className="text-red-600 text-sm">{errors.leetcode_handle.message}</p>
						)}
					</div>
				</div>
				<div>
					<label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
						GitHub
					</label>
					<input
						type="text"
						id="github"
						{...register("github")}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
							errors.github?.message ? "border-red-500" : "border-gray-200"
						}`}
					/>
					{errors.github && <p className="text-red-600 text-sm">{errors.github.message}</p>}
				</div>
			</div>
		</div>
	);
}
