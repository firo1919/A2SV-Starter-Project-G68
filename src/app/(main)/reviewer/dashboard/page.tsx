import ApplicationGrid from "@/app/components/reviewer/application-grid";
import { CustomButton } from "@/app/components/reviewer/custom-button";
import Pagination from "@/app/components/reviewer/pagination";
import { getAssignedReviews } from "@/utils/reviewerUtils";

export default async function Dashboard() {
	const applications = await getAssignedReviews();
	if (!applications || !applications.success) {
		throw Error("couldnt load assigned applications");
	}
	const totalApplications = applications?.data.reviews.length;
	return (
		<div className="max-w-7xl w-9/10 mx-auto py-8">
			<div className="flex flex-col gap-2 mb-4">
				<h1 className="text-3xl font-bold text-gray-900">Assigned Applications</h1>
				<p className="text-base text-gray-600">
					You have {totalApplications} applications waiting for your review.
				</p>
			</div>
			<div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
				<div className="flex gap-2">
					<CustomButton style={{ backgroundColor: "#4F46E5", color: "#fff" }}>All</CustomButton>
					<CustomButton variant="outline" style={{ backgroundColor: "#E5E7EB" }}>
						Under Review
					</CustomButton>
					<CustomButton variant="outline" style={{ backgroundColor: "#E5E7EB" }}>
						Complete
					</CustomButton>
				</div>
				<CustomButton
					variant="outline"
					style={{ backgroundColor: "#F3F4F6", border: "1px solid #D1D5DB", color: "#111827" }}
				>
					Sort by Submission Date
				</CustomButton>
			</div>
			<ApplicationGrid applications={applications} />
			<Pagination currentPage={1} itemsPerPage={6} totalItems={totalApplications} />
		</div>
	);
}
