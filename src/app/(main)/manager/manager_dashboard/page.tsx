
import type { NextPage } from 'next';
import { auth } from '@/auth';
import ManagerDashboardClient from '@/app/components/manager/ManagerDashboardClient';

const API_BASE = process.env.API_BASE


export type ApplicationStatusAPI = 'in_progress' | 'accepted' | 'rejected' | 'new';
export interface ApplicationSummary { id: string; applicant_name: string; status: ApplicationStatusAPI; assigned_reviewer_name: string | null; }
export interface AvailableReviewer { id: string; full_name: string; email: string; }
export interface TeamMemberPerformance { name: string; assignedCount: number; }



async function fetchData() {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) { throw new Error('Not authenticated. No access token found.'); }

  const headers = { 'Authorization': `Bearer ${token}` };
  const config = { headers, next: { revalidate: 60 } };


  const [applicationsRes, reviewersRes, assignedReviewsRes] = await Promise.all([
    fetch(`${API_BASE}/manager/applications/`, config),
    fetch(`${API_BASE}/manager/applications/available-reviewers`, config),
    fetch(`${API_BASE}/reviews/assigned`, config) 
  ]);

  if (!applicationsRes.ok) throw new Error('Failed to fetch applications');
  if (!reviewersRes.ok) throw new Error('Failed to fetch available reviewers');

  
  const applicationsData = await applicationsRes.json();
  const reviewersData = await reviewersRes.json();
  
  
  if (assignedReviewsRes.ok) {
    const assignedReviewsData = await assignedReviewsRes.json();
    console.log(" RESULT: GET /reviews/assigned ---");
    console.log(JSON.stringify(assignedReviewsData, null, 2));
  } else {
    console.log(" RESULT: GET /reviews/assigned ---");
    console.log(`Failed with status: ${assignedReviewsRes.status} ${assignedReviewsRes.statusText}`);
  }

  return {
    applications: applicationsData.data.applications as ApplicationSummary[],
    reviewers: reviewersData.data.reviewers as AvailableReviewer[]
  };
}



const ManagerDashboardPage: NextPage = async () => {
  try {
    const { applications, reviewers } = await fetchData();

    const stats = {
      totalApplications: applications.length,
      underReview: applications.filter(app => app.status === 'in_progress').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
      interviewStage: 250,
    };

    
    const performanceMap = new Map<string, number>();
    for (const app of applications) {
      if (app.assigned_reviewer_name) {
        const currentCount = performanceMap.get(app.assigned_reviewer_name) || 0;
        performanceMap.set(app.assigned_reviewer_name, currentCount + 1);
      }
    }
    const teamPerformance: TeamMemberPerformance[] = Array.from(performanceMap.entries()).map(
      ([name, assignedCount]) => ({ name, assignedCount })
    );

    return (
      <ManagerDashboardClient
        applications={applications}
        reviewers={reviewers}
        stats={stats}
        teamPerformance={teamPerformance}
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