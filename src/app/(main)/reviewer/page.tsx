import AssignedApplications from "@/app/components/reviewer/assigned-applications"; // Corrected import path
import ApplicationGrid from "@/app/components/reviewer/application-grid";     // Corrected import path
import Pagination from "@/app/components/reviewer/pagination";               // Corrected import path
import { Application } from "@/app/components/reviewer/types";               // Corrected import path
// import { auth } from "@/auth"; // Commented out: Uncomment and configure NextAuth.js if needed

export default async function Page() {
  const baseUrl = process.env.API_BASE; // Using API_BASE as per your environment
  // const session = await auth(); // Commented out: Uncomment if NextAuth.js is configured

  let applications: Application[] = [];
  let totalApplications = 0;
  let errorMessage: string | null = null;

  if (!baseUrl) {
    errorMessage = "API Base URL is not defined. Cannot fetch applications.";
    console.error("ERROR: API_BASE environment variable is not set."); // Added specific log
  } else {
    console.log(`INFO: Attempting to fetch applications from: ${baseUrl}/reviews/assigned/`); // Added log
    try {
      const response = await fetch(`${baseUrl}/reviews/assigned/`, {
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${session?.user.accessToken || ''}`,
        },
        cache: 'no-store', // Added cache: 'no-store' to ensure fresh data during debugging
      });

      if (!response.ok) {
        errorMessage = `Failed to fetch assigned applications: ${response.status} ${response.statusText}`;
        console.error(`ERROR: API response not OK. Status: ${response.status}, Text: ${response.statusText}`); // Added log
      } else {
        const data = (await response.json()) as Application[];
        applications = data;
        totalApplications = data.length;
        console.log(`INFO: Successfully fetched ${totalApplications} applications.`); // Added log
        if (totalApplications === 0) {
          console.log("INFO: No applications found from the API."); // Added log for empty data
        }
      }
    } catch (error) {
      errorMessage = `Error fetching assigned applications: ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error("ERROR: Exception during API fetch:", error); // Added log for catch block
    }
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <AssignedApplications />
      {errorMessage ? (
        <div className="w-full max-w-[1280px] mx-auto px-8 py-6 text-center text-red-600">
          <p className="font-bold text-lg mb-2">Error Loading Applications:</p>
          <p>{errorMessage}</p>
          <p className="mt-2 text-sm text-gray-700">
            Please ensure your `API_BASE` environment variable is correctly set and your backend server is running and accessible.
          </p>
        </div>
      ) : (
        <>
          {applications.length === 0 && totalApplications === 0 ? ( // Check if no applications were fetched
            <div className="w-full max-w-[1280px] mx-auto px-8 py-6 text-center text-gray-600">
              <p className="text-lg">No assigned applications found at this time.</p>
              <p className="text-sm mt-2">Check back later or ensure your backend has data.</p>
            </div>
          ) : (
            <>
              <ApplicationGrid applications = {applications} />
              <Pagination itemsPerPage={6} totalItems={totalApplications} />
            </>
          )}
        </>
      )}
    </main>
  );
}
