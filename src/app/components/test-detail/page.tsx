import ApplicationReviewDetail from "@/app/components/reviewer/application-review-detail";
import { Application } from "@/app/components/reviewer/types";

export default function TestDetailPage() {
  // This is mock data to help you see how the component renders.
  // You can modify this data to test different states or values.
  const mockApplication: Application = {
    id: "mock-app-123",
    name: "Jane Doe",
    submittedDate: "2025-08-01",
    status: "under-review", // Try 'new' or 'review-complete'
    avatarUrl: "/placeholder.svg?height=64&width=64&text=JD",
    school: "University of Example",
    degreeProgram: "Computer Science",
    codingProfiles: {
      github: "https://github.com/janedoe",
      leetcode: "https://leetcode.com/janedoe",
    },
    essay1: "My passion for technology began when I built my first computer at age 10...",
    essay2: "I am eager to join your team because of your innovative approach to AI...",
    resumeUrl: "/placeholder.svg?height=200&width=150&text=Resume.pdf", // Placeholder for resume
    activityCheckNotes: "Candidate has strong GitHub activity. LeetCode profile shows consistent problem-solving.",
    resumeScore: 92,
    essayScore: 88,
    reviewerComments: "Overall strong candidate, good fit for the program.",
  };

  return (
    <ApplicationReviewDetail application={mockApplication} />
  );
}
