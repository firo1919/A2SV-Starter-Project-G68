"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import { useAssignReviewerMutation, useDecideApplicationMutation } from '@/lib/redux/api/managerApiSlice'; 


import type { ApplicationDetails, ReviewDetails, AvailableReviewer } from '@/app/(main)/manager/manager_details/[id]/page'; 




interface ManageApplicantClientProps {
  application: ApplicationDetails;
  review: ReviewDetails | null;
  reviewers: AvailableReviewer[];
}



const ProfileField = ({ label, children }: { label: string; children: React.ReactNode; }) => (
  <div>
    <p className="text-sm font-semibold text-gray-500">{label}</p>
    <div className="mt-1 text-gray-800">{children}</div>
  </div>
);




const ManageApplicantClient: NextPage<ManageApplicantClientProps> = ({ application, review, reviewers }) => {
  const router = useRouter();
  const [selectedReviewerId, setSelectedReviewerId] = useState<string>(reviewers[0]?.id || '');
  

  const [assignReviewer, { isLoading: isAssigning }] = useAssignReviewerMutation();
  const [decideApplication, { isLoading: isDeciding }] = useDecideApplicationMutation();
  const isSubmitting = isAssigning || isDeciding;

  const handleAssign = async () => {
    if (!selectedReviewerId) {
      alert('Please select a reviewer.');
      return;
    }
    try {
      await assignReviewer({ 
        id: application.id, 
        reviewer: { reviewer_id: selectedReviewerId } 
      }).unwrap();
      alert('Reviewer assigned successfully!');
      router.refresh(); 
    } catch (error: any) {
      alert(`Error assigning reviewer: ${error.data?.message || 'An error occurred'}`);
    }
  };

  const handleDecision = async (status: 'accepted' | 'rejected') => {
    try {
      await decideApplication({ 
        id: application.id, 
        decision: { status, decision_notes: `Decision set to ${status}` }
      }).unwrap();
      alert(`Application has been ${status}.`);
      router.refresh(); 
    } catch (error: any) {
      alert(`Error making decision: ${error.data?.message || 'An error occurred'}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/manager/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <IoChevronBack className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 font-poppins">
            Manage: {application.applicant_name}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-6">Applicant Profile</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="School">{application.school}</ProfileField>
                  <ProfileField label="Degree Program">{application.degree}</ProfileField>
                </div>
                <ProfileField label="Coding Profiles">
                  <div className="flex space-x-4">
                    <a href={`https://leetcode.com/${application.leetcode_handle}`} target="_blank" className="text-indigo-600 hover:underline">LeetCode</a>
                    <a href={`https://codeforces.com/profile/${application.codeforces_handle}`} target="_blank" className="text-indigo-600 hover:underline">Codeforces</a>
                  </div>
                </ProfileField>
                <ProfileField label="Essay: About You"><p>{application.essay_about_you}</p></ProfileField>
                <ProfileField label="Essay: Why A2SV?"><p>{application.essay_why_a2sv}</p></ProfileField>
                <ProfileField label="Resume">
                  <a href={application.resume_url} target="_blank" className="text-indigo-600 hover:underline">View Resume.pdf</a>
                </ProfileField>
              </div>
            </div>

            
            
            {review ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 font-poppins mb-6">Reviewers Feedback</h2>
                <div className="space-y-6">
                  <ProfileField label="Activity Check">{review.activity_check_notes}</ProfileField>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField label="Resume Score">{review.resume_score}/100</ProfileField>
                    <ProfileField label="Essay Score">{review.essay_why_a2sv_score}/100</ProfileField>
                    <ProfileField label="Tech Interview">{review.technical_interview_score}/100</ProfileField>
                    <ProfileField label="Behavioral">{review.behavioral_interview_score}/100</ProfileField>
                  </div>
                  <ProfileField label="Interviewer Notes">{review.interview_notes}</ProfileField>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-500">
                <p>No reviewer feedback has been submitted yet.</p>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div>
                <h2 className="text-xl font-bold text-gray-800 font-poppins mb-4">Manager Actions</h2>
                <div>
                  <label htmlFor="reviewer" className="block text-sm font-semibold text-gray-500 mb-1">Assign Reviewer</label>
                  <select
                    id="reviewer"
                    value={selectedReviewerId}
                    onChange={(e) => setSelectedReviewerId(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-100 border-gray-200 text-gray-800 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  >
                    {reviewers.map(r => <option key={r.id} value={r.id}>{r.full_name}</option>)}
                  </select>
                  <button onClick={handleAssign} disabled={isSubmitting} className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                    {isAssigning ? 'Assigning...' : 'Confirm'}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 font-poppins mb-2">Final Decision</h2>
                <p className="text-sm text-gray-500 mb-4">This action is final and will notify the applicant.</p>
                <div className="flex space-x-3">
                  <button onClick={() => handleDecision('rejected')} disabled={isSubmitting} className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
                    {isDeciding ? '...' : 'Reject'}
                  </button>
                  <button onClick={() => handleDecision('accepted')} disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                    {isDeciding ? '...' : 'Accept'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageApplicantClient;