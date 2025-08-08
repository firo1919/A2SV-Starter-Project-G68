import Image from "next/image";
import { notFound } from "next/navigation";
import { Application } from "@/app/components/reviewer/types";
import { CustomButton } from "@/app/components/reviewer/custom-button";
import ReviewForm from "@/app/components/reviewer/review-form"; // Import the new ReviewForm

interface ApplicationDetailPageProps {
  params: {
    application_id: string;
  };
}

// This is a Server Component
export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const { application_id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  let application: Application | null = null;

  try {
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_API_BASE is not defined. Cannot fetch application details.");
    } else {
      // Use the GET /reviews/{application_id}/ endpoint
      const response = await fetch(`${baseUrl}/reviews/${application_id}/`, {
        // Add revalidate tag for Next.js caching if needed
        // next: { tags: [`application-${application_id}`] },
        // Add authentication headers if required
        // headers: {
        //   'Authorization': `Bearer YOUR_ACCESS_TOKEN_HERE`
        // }
      });

      if (!response.ok) {
        if (response.status === 404) {
          notFound(); // Render Next.js 404 page if application not found
        }
        console.error(`Failed to fetch application ${application_id}: ${response.status} ${response.statusText}`);
      } else {
        application = await response.json();
      }
    }
  } catch (error) {
    console.error(`Error fetching application ${application_id}:`, error);
  }

  if (!application) {
    // This case should ideally be caught by notFound() for 404,
    // but handles other fetch errors resulting in null application.
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Failed to load application details.</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen p-8">
      <div className="w-full max-w-[1280px] mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Application Details</h1>

        <div className="flex items-center gap-6 mb-8">
          <Image
            src={application.avatarUrl || "/placeholder.svg?height=96&width=96&text=Avatar"}
            alt={`${application.name}'s avatar`}
            width={96}
            height={96}
            className="rounded-full border-2 border-gray-200"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{application.name}</h2>
            <p className="text-lg text-gray-600">Submitted: {application.submittedDate}</p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                application.status === "under-review" ? "bg-yellow-100 text-yellow-800" :
                application.status === "review-complete" ? "bg-green-100 text-green-800" :
                "bg-blue-100 text-blue-800"
              }`}
            >
              {application.status.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Review Information</h3>
          <p className="text-gray-700 mb-2">
            <strong>Current Comments:</strong> {application.reviewerComments || "No comments yet."}
          </p>
          <p className="text-gray-700">
            <strong>Score:</strong> {application.score !== undefined ? application.score : "N/A"}
          </p>
        </div>

        {/* Review Form */}
        <ReviewForm applicationId={application.id} currentComments={application.reviewerComments} currentScore={application.score} />
      </div>
    </main>
  );
}
