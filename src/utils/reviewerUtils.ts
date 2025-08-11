import { auth } from "@/auth";
import { Application, AssignedReviews } from "@/types/reviewerTypes";
import { formatDate } from "./date";

const baseUrl = process.env.API_BASE;

export async function getAssignedReviews(): Promise<AssignedReviews | null> {
	const session = await auth();
	try {
		const response = await fetch(`${baseUrl}/reviews/assigned?limit=100`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.user.accessToken || ""}`,
			},
		});

		if (!response.ok) {
			console.error(`ERROR: API response not OK. Status: ${response.status}, Text: ${response.statusText}`);
		} else {
			const data: AssignedReviews = await response.json();
			const reviews = data.data.reviews.map((e) => ({
				...e,
				submission_date: formatDate(e.submission_date),
			}));
			data.data.reviews = reviews;
			return data;
		}
	} catch (error) {
		console.error("ERROR: Exception during API fetch:", error);
	}
	return null;
}

export async function getApplicationToBeReviewed(application_id: string): Promise<Application | null> {
	const session = await auth();
	try {
		const response = await fetch(`${baseUrl}/reviews/${application_id}/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.user.accessToken || ""}`,
			},
		});

		if (!response.ok) {
			console.error(`ERROR: API response not OK. Status: ${response.status}, Text: ${response.statusText}`);
		} else {
			const data: Application = await response.json();
			data.data.applicant_details.submitted_at = formatDate(data.data.applicant_details.submitted_at);
			return data;
		}
	} catch (error) {
		console.error("ERROR: Exception during API fetch:", error);
	}
	return null;
}
