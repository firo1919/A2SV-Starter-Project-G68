interface CodingProfilesProps {
	formData: {
		codeforces: string;
		leetcode: string;
		github: string;
	};
	updateFormData: (field: string, value: string) => void;
}

export default function CodingProfiles({ formData, updateFormData }: CodingProfilesProps) {
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
							onChange={(e) => updateFormData("codeforces", e.target.value)}
							className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
						/>
					</div>
					<div>
						<label htmlFor="leetcode" className="block text-sm font-medium text-gray-700 mb-2">
							LeetCode
						</label>
						<input
							type="text"
							id="leetcode"
							value={formData.leetcode}
							onChange={(e) => updateFormData("leetcode", e.target.value)}
							className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
						/>
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
						onChange={(e) => updateFormData("github", e.target.value)}
						className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
					/>
				</div>
			</div>
		</div>
	);
}
