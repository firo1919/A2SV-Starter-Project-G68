// app/manager/manager_dashboard/page.tsx
import type { NextPage } from 'next';
import { auth } from '@/auth';
import ManagerDashboardClient from '@/app/components/manager/ManagerDashboardClient';
/* eslint-disable @typescript-eslint/no-explicit-any */

// --- DATA FETCHING (Runs on the server) ---
async function fetchData() {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    throw new Error('Not authenticated. No access token found.');
  }

  const headers = { 'Authorization': `Bearer ${token}` };
  const config = { headers, next: { revalidate: 60 } }; // Cache for 60 seconds

  // Fetch applications and reviewers in parallel for better performance
  const [applicationsRes, reviewersRes] = await Promise.all([
    fetch(`${process.env.API_BASE}/manager/applications/`, config),
    fetch(`${process.env.API_BASE}/manager/applications/available-reviewers`, config)
  ]);

  if (!applicationsRes.ok) throw new Error('Failed to fetch applications');
  if (!reviewersRes.ok) throw new Error('Failed to fetch available reviewers');


  const applicationsData = await applicationsRes.json();
  const reviewersData = await reviewersRes.json();

  return {
    applications: applicationsData.data.applications,
    reviewers: reviewersData.data.reviewers
  };
}

// --- MAIN PAGE COMPONENT (Server Component) ---
const ManagerDashboardPage: NextPage = async () => {
  try {
    const { applications, reviewers } = await fetchData();

    // Calculate stats from the fetched data
    const totalApplications = applications.length;
    const underReview = applications.filter((app: any) => app.status === 'in_progress').length;
    const accepted = applications.filter((app: any) => app.status === 'accepted').length;
    const stats = { totalApplications, underReview, accepted, interviewStage: 250 }; // interviewStage is static

    // Render the Client Component and pass the fetched data and stats as props
    return (
      <ManagerDashboardClient
        applications={applications}
        reviewers={reviewers}
        stats={stats}
      />
    );
  } catch (error) {
    console.error("Dashboard Page Error:", error);
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Could not load dashboard.</h1>
        <p className="text-gray-600 mt-2">There was an issue fetching data. Please ensure you are logged in.</p>
      </main>
    );
  }
};

export default ManagerDashboardPage;