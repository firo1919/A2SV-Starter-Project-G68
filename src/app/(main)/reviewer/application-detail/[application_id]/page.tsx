import ApplicationReviewDetail from "@/app/components/reviewer/application-review-detail"; // Import the new component
import { getApplicationToBeReviewed } from "@/utils/reviewerUtils";
import { redirect } from "next/navigation";
interface ApplicationDetailPageProps {
	params: {
		application_id: string;
	};
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
	const { application_id } = params;
	if (!application_id) {
		redirect("/reviewer/dashboard");
	}
	const application = await getApplicationToBeReviewed(application_id);
	if (!application || !application.success) {
		throw Error("couldnt load assigned applications");
	}

	return (
		<div className="max-w-7xl w-9/10 mx-auto">
			<ApplicationReviewDetail application={application} />;
		</div>
	);
}
