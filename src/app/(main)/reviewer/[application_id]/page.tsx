import { notFound } from "next/navigation";
import { Application } from "@/app/components/reviewer/types";
import ApplicationReviewDetail from "@/app/components/reviewer/application-review-detail"; // Import the new component
import Link from "next/link";
interface ApplicationDetailPageProps {
  params: {
    application_id: string;
  };
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { application_id } = params;
  const baseUrl = process.env.API_BASE; // Using API_BASE as per your environment

  let application: Application | null = null;
  let errorMessage: string | null = null;

  try {
    if (!baseUrl) {
      errorMessage = "API Base URL is not defined. Cannot fetch application details.";
      console.error(errorMessage);
    } else {
      const response = await fetch(`${baseUrl}/reviews/${application_id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${session?.user.accessToken || ''}`, // Uncomment if NextAuth.js is configured
        },
        // Consider adding cache: 'no-store' during development to ensure fresh data
        // cache: 'no-store',
      });

      if (!response.ok) {
        if (response.status === 404) {
          notFound();
        }
        errorMessage = `Failed to fetch application ${application_id}: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
      } else {
        application = await response.json();
      }
    }
  } catch (error) {
    errorMessage = `Error fetching application ${application_id}: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMessage);
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
        <div className="text-center text-red-600">
          <p className="text-lg">{errorMessage || "Failed to load application details."}</p>
          <p>Please check your API_BASE environment variable and backend server status.</p>
          <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mt-4">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Pass the fetched application data to the new component
  return <ApplicationReviewDetail application={application} />;
}
