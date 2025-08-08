import { PersonalInfoFormData } from "@/lib/zod/applicantsSubmitionForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
	register: UseFormRegister<PersonalInfoFormData>;
	errors: FieldErrors<PersonalInfoFormData>;
}
export default function PersonalInfo({ register, errors }: Props) {
	return (
		<form>
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
							{...register("student_id")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.student_id?.message ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.student_id && <p className="text-red-600 text-sm">{errors.student_id.message}</p>}
					</div>
					<div>
						<label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
							School / University
						</label>
						<input
							type="text"
							id="school"
							{...register("school")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.school?.message ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.school && <p className="text-red-600 text-sm">{errors.school.message}</p>}
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
					<div>
						<label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700 mb-2">
							Degree Program
						</label>
						<input
							type="text"
							id="degreeProgram"
							{...register("degreeProgram")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.degreeProgram?.message ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.degreeProgram && <p className="text-red-600 text-sm">{errors.degreeProgram.message}</p>}
					</div>
					<div>
						<label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
							Country
						</label>
						<input
							type="text"
							id="country"
							{...register("country")}
							className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
								errors.country?.message ? "border-red-500" : "border-gray-200"
							}`}
						/>
						{errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
					</div>
				</div>
			</div>
		</form>
	);
}
