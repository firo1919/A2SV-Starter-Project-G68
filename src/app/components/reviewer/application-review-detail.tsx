'use client' 

import Image from "next/image";
import Link from "next/link";
import { Application } from "@/app/components/reviewer/types";
import ReviewForm from "@/app/components/reviewer/review-form";
import { cn } from "@/app/components/reviewer/utils"; 

interface ApplicationReviewDetailProps {
  application: Application;
}

export default function ApplicationReviewDetail({ application }: ApplicationReviewDetailProps) {
  return (
    <main className="bg-gray-50 min-h-screen p-8">
      <div className="w-full max-w-[1280px] mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Review: {application.name}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Applicant Profile</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <Image
                  src={application.avatarUrl || "/placeholder.svg?height=64&width=64&text=JD"}
                  alt={`${application.name}'s avatar`}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-gray-200"
                />
                <div>
                  <p className="text-lg font-medium">{application.name}</p>
                  <p className="text-sm text-gray-600">Submitted: {application.submittedDate}</p>
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1",
                      application.status === "under-review" ? "bg-yellow-100 text-yellow-800" :
                      application.status === "review-complete" ? "bg-green-100 text-green-800" :
                      "bg-blue-100 text-blue-800"
                    )}
                  >
                    {application.status.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                  </span>
                </div>
              </div>

              {application.school && application.degreeProgram && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">School</p>
                    <p>{application.school}</p>
                  </div>
                  <div>
                    <p className="font-medium">Degree Program</p>
                    <p>{application.degreeProgram}</p>
                  </div>
                </div>
              )}

              {application.codingProfiles && (
                <div>
                  <p className="font-medium mb-1">Coding Profiles</p>
                  <div className="flex gap-4">
                    {application.codingProfiles.github && <a href={application.codingProfiles.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>}
                    {application.codingProfiles.leetcode && <a href={application.codingProfiles.leetcode} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LeetCode</a>}
                    {application.codingProfiles.codeforces && <a href={application.codingProfiles.codeforces} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Codeforces</a>}
                  </div>
                </div>
              )}

              {application.essay1 && (
                <div>
                  <p className="font-medium">Essay 1: Tell us about your self.?</p>
                  <p className="whitespace-pre-wrap">{application.essay1}</p>
                </div>
              )}

              {application.essay2 && (
                <div>
                  <p className="font-medium">Essay 2: Why do you want to Join us?</p>
                  <p className="whitespace-pre-wrap">{application.essay2}</p>
                </div>
              )}

              {application.resumeUrl && (
                <div>
                  <p className="font-medium">Resume</p>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume.pdf</a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Evaluation Form</h2>
            </div>
            <div>
              <ReviewForm
                applicationId={application.id}
                currentComments={application.activityCheckNotes || application.reviewerComments}
                currentResumeScore={application.resumeScore}
                currentEssayScore={application.essayScore}
                currentStatus={application.status}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
