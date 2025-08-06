export type ApplicationStatus = "under-review" | "review-complete" | "new";

export interface Application {
  id: string;
  name: string;
  submittedDate: string;
  status: ApplicationStatus;
  avatarUrl: string;
}
