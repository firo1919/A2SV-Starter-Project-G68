
"use client";

import type { NextPage } from 'next';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';

const applicantProfile = {
  name: 'Abel Tadesse',
  school: 'Addis Ababa Institute of Technology',
  degree: 'Software Engineering',
  codingProfiles: [
    { name: 'GitHub', url: '#' }, { name: 'LeetCode', url: '#' }, { name: 'Codeforces', url: '#' },
  ],
  essay1: { question: 'Tell us about yourself.', answer: 'I am passionate about solving complex problems.', },
  essay2: { question: 'Why do you want to join us?', answer: 'I want to join because I am sure it will help me to improve my problem solving skill.', },
  resumeUrl: '#',
};
const reviewerFeedback = {
  reviewerName: 'Jane R.',
  activityCheck: 'Pass - 50 LC, 35 CF, 30 days active',
  resumeScore: '85/100', essayScore: '90/100',
  techInterviewScore: '88/100', behavioralScore: '92/100',
  interviewerNotes: 'Strong candidate with excellent problem-solving skills.',
};
interface ProfileFieldProps { label: string; children: React.ReactNode; className?: string; }
const ProfileField = ({ label, children, className }: ProfileFieldProps) => (
  <div className={className}>
    <p className="text-sm font-semibold text-gray-500">{label}</p>
    <div className="mt-1 text-gray-800">{children}</div>
  </div>
);


// --- MAIN PAGE COMPONENT ---
const ManageApplicantPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <IoChevronBack className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 font-poppins">
            Manage: {applicantProfile.name}
          </h1>
        </div>

        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
          
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-8">
            
            {/* Applicant Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-6">Applicant Profile</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="School">{applicantProfile.school}</ProfileField>
                  <ProfileField label="Degree Program">{applicantProfile.degree}</ProfileField>
                </div>
                <ProfileField label="Coding Profiles">
                  <div className="flex space-x-4">
                    {applicantProfile.codingProfiles.map(profile => (
                      <a key={profile.name} href={profile.url} className="text-indigo-600 hover:underline">
                        {profile.name}
                      </a>
                    ))}
                  </div>
                </ProfileField>
                <ProfileField label={`Essay 1: ${applicantProfile.essay1.question}`}><p>{applicantProfile.essay1.answer}</p></ProfileField>
                <ProfileField label={`Essay 2: ${applicantProfile.essay2.question}`}><p>{applicantProfile.essay2.answer}</p></ProfileField>
                <ProfileField label="Resume">
                  <a href={applicantProfile.resumeUrl} className="text-indigo-600 hover:underline">View Resume.pdf</a>
                </ProfileField>
              </div>
            </div>

            {/* Reviewer's Feedback Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-6">Reviewers Feedback ({reviewerFeedback.reviewerName})</h2>
              <div className="space-y-6">
                <ProfileField label="Activity Check">{reviewerFeedback.activityCheck}</ProfileField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="Resume Score">{reviewerFeedback.resumeScore}</ProfileField>
                  <ProfileField label="Essay Score">{reviewerFeedback.essayScore}</ProfileField>
                  <ProfileField label="Tech Interview">{reviewerFeedback.techInterviewScore}</ProfileField>
                  <ProfileField label="Behavioral">{reviewerFeedback.behavioralScore}</ProfileField>
                </div>
                <ProfileField label="Interviewer Notes">{reviewerFeedback.interviewerNotes}</ProfileField>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-1/3">
            
            {/* Single Card for Actions & Decision */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              
              {/* Manager Actions Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 font-poppins mb-4">Manager Actions</h2>
                <div>
                  <label htmlFor="reviewer" className="block text-sm font-semibold text-gray-500 mb-1">Assign Reviewer</label>
                  <select 
                    id="reviewer"
                    className="w-full bg-gray-100 border-gray-200 text-gray-800 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Jane R.</option> <option>Mike R.</option>
                    <option>Abebe Kebede</option> <option>Alemu Mossie</option>
                  </select>
                  
                  <button className="mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Confirm
                  </button>
                </div>
              </div>

              {/* Separator Line */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Final Decision Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 font-poppins mb-2">Final Decision</h2>
                <p className="text-sm text-gray-500 mb-4">This action is final and will notify the applicant.</p>
                <div className="flex space-x-3">
                  <button className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Reject
                  </button>
                  <button className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Accept
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

export default ManageApplicantPage;