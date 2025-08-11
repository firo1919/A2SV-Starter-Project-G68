import { AssignedReviews } from "../../../types/reviewerTypes";
import ApplicationCard from "./application-card";
interface Props {
	applications: AssignedReviews;
}
export default function ApplicationGrid({ applications }: Props) {
	return (
		<div className="py-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{applications.data.reviews.map((app) => (
					<ApplicationCard key={app.application_id} application={app} />
				))}
			</div>
		</div>
	);
}
