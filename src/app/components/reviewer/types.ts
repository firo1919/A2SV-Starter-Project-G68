export type ApplicationStatus = "under-review" | "review-complete" | "new";

export interface Application {
  id: string;
  name: string;
  submittedDate: string;
  status: ApplicationStatus;
  avatarUrl: string;
  // New fields from Applicant Profile
  school?: string;
  degreeProgram?: string;
  codingProfiles?: {
    github?: string;
    leetcode?: string;
    codeforces?: string;
  };
  essay1?: string;
  essay2?: string;
  resumeUrl?: string;

  activityCheckNotes?: string; 
  resumeScore?: number;
  essayScore?: number;
  
  reviewerComments?: string; 
  score?: number; 
}
