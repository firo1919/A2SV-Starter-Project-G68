import type { NextPage } from "next"
import { auth } from "@/auth"
import ManagerDashboardClient from "@/app/components/manager/ManagerDashboardClient"

export type ApplicationStatusAPI = "Pending Review" | "accepted" | "rejected" | "new"

export interface ApplicationSummary {
  id: string
  applicant_name: string
  status: ApplicationStatusAPI
  assigned_reviewer_name: string | null
}

export interface AvailableReviewer {
  id: string
  full_name: string
  email: string
}

export interface TeamMemberPerformance {
  name: string
  assignedCount: number
}

export interface DashboardStats {
  totalApplications: number
  underReview: number
  accepted: number
  interviewStage: number
}


async function fetchApplications(token: string, apiBase: string): Promise<ApplicationSummary[]> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
    
  }

  const response = await fetch(`${apiBase}/manager/applications/`, config)

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Failed to fetch applications: ${response.status} ${response.statusText} - ${errorText}`)
    throw new Error("Failed to fetch applications")
  }

  const data = await response.json()
  return data.data.applications as ApplicationSummary[]
}

async function fetchAvailableReviewers(token: string, apiBase: string): Promise<AvailableReviewer[]> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }, 
    
  }

  const response = await fetch(`${apiBase}/manager/applications/available-reviewers`, config)

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Failed to fetch available reviewers: ${response.status} ${response.statusText} - ${errorText}`)
    throw new Error("Failed to fetch available reviewers")
  }

  const data = await response.json()
  return data.data.reviewers as AvailableReviewer[]
}

async function fetchAssignedReviews(token: string, apiBase: string): Promise<void> {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }, 
    
  }

  const response = await fetch(`${apiBase}/reviews/assigned`, config)

  if (response.ok) {
    const data = await response.json()
    console.log("--- EXPERIMENT RESULT: GET /reviews/assigned ---")
    console.log(JSON.stringify(data, null, 2))
  } else {
    console.log("--- EXPERIMENT RESULT: GET /reviews/assigned ---")
    console.log(`Failed with status: ${response.status} ${response.statusText}`)
  }
}  

function calculateDashboardStats(applications: ApplicationSummary[]): DashboardStats {
  return {
    totalApplications: applications.length,
    underReview: applications.filter((app) => app.status === "Pending Review").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    interviewStage: 250,
  }
}

function calculateTeamPerformance(applications: ApplicationSummary[]): TeamMemberPerformance[] {
  const performanceMap = new Map<string, number>()

  for (const app of applications) {
    if (app.assigned_reviewer_name) {
      const currentCount = performanceMap.get(app.assigned_reviewer_name) || 0
      performanceMap.set(app.assigned_reviewer_name, currentCount + 1)
    }
  }

  return Array.from(performanceMap.entries()).map(([name, assignedCount]) => ({ name, assignedCount }))
}


async function fetchDashboardData() {
  const session = await auth()
  const token = session?.user?.accessToken

  if (!token) {
    throw new Error("Not authenticated. No access token found.")
  }

  const API_BASE = process.env.API_BASE
  if (!API_BASE) {
    throw new Error("API_BASE environment variable is not set.")
  }

  console.log("Fetching applications...")
  const applications = await fetchApplications(token, API_BASE)

  console.log("Fetching available reviewers...")
  const reviewers = await fetchAvailableReviewers(token, API_BASE)

  console.log("Fetching assigned reviews (experimental)...")
  await fetchAssignedReviews(token, API_BASE)

  return { applications, reviewers }
}


const ManagerDashboardPage: NextPage = async () => {
  try {
    const { applications, reviewers } = await fetchDashboardData()

    const stats = calculateDashboardStats(applications)
    const teamPerformance = calculateTeamPerformance(applications)

    return (
      <ManagerDashboardClient
        applications={applications}
        reviewers={reviewers}
        stats={stats}
        teamPerformance={teamPerformance}
      />
    )
  } catch (error) {
    console.error("Dashboard Page Error:", error)
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Could not load dashboard.</h1>
        <p className="text-gray-600 mt-2">
          There was an issue fetching data. Please ensure you are logged in and the API is accessible.
        </p>
      </main>
    )
  }
}

export default ManagerDashboardPage
