interface PersonalInfoProps {
	formData: {
		idNumber: string;
		school: string;
		degreeProgram: string;
	};
	updateFormData: (field: string, value: string) => void;
}

export default function PersonalInfo({ formData, updateFormData }: PersonalInfoProps) {
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
							onChange={(e) => updateFormData("idNumber", e.target.value)}
							className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
						/>
					</div>
					<div>
						<label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
							School / University
						</label>
						<input
							type="text"
							id="school"
							value={formData.school}
							onChange={(e) => updateFormData("school", e.target.value)}
							className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
						/>
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
						onChange={(e) => updateFormData("degreeProgram", e.target.value)}
						className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
					/>
				</div>
			</div>
		</div>
	);
}
