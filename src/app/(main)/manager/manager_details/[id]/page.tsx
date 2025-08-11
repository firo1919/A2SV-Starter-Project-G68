

import ManageApplicantClient from '@/app/components/manager/ManageApplicantClient';
import { auth } from '@/auth'; 
/* eslint-disable @typescript-eslint/no-explicit-any */


const API_BASE = process.env.API_BASE

export interface ApplicationDetails {
  id: string;
  status: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  applicant_name: string;
}

export interface ReviewDetails {
  id: string;
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
}

export interface AvailableReviewer {
  id: string;
  full_name: string;
  email: string;
}



async function getApplicantData(id: string) {
  const session = await auth();
  const token = session?.user?.accessToken;
  if (!token) throw new Error("Not authenticated");

  const headers = { 'Authorization': `Bearer ${token}` };
  const config = { headers, next: { revalidate: 10 } };


  
  const [appRes, reviewersRes] = await Promise.all([
    fetch(`${API_BASE}/manager/applications/${id}`, config),
    fetch(`${API_BASE}/manager/applications/available-reviewers`, config)
  ]);

  if (!appRes.ok) throw new Error(`Failed to fetch application details for ID: ${id}`);
  if (!reviewersRes.ok) throw new Error('Failed to fetch available reviewers');

  const appData = await appRes.json();
  const reviewersData = await reviewersRes.json();
  
  return {
    application: appData.data.application as ApplicationDetails,
    review: appData.data.review as ReviewDetails | null, 
    reviewers: reviewersData.data.reviewers as AvailableReviewer[]
  };
}




export default async function ManageApplicantPage({ params }: { params: { id: string } }) {
  try {
    const { application, review, reviewers } = await getApplicantData(params.id);

    return (
      <ManageApplicantClient
        application={application}
        review={review}
        reviewers={reviewers}
      />
    );
  } catch (error: any) {
    console.error("Failed to load applicant details:", error.message);
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Could not load applicant data.</h1>
        <p className="text-gray-600 mt-2">The requested applicant might not exist or an error occurred.</p>
      </main>
    );
  }
}