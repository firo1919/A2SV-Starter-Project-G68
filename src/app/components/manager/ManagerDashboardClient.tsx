"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaUser } from "react-icons/fa"
import { IoChevronDown, IoChevronForward } from "react-icons/io5"
/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  ApplicationSummary,
  AvailableReviewer,
  TeamMemberPerformance,
  ApplicationStatusAPI,
} from "@/app/(main)/manager/manager_dashboard/page"
import { useAssignReviewerMutation } from "@/lib/redux/api/managerApiSlice"

interface DashboardStats {
  totalApplications: number
  underReview: number
  accepted: number
  interviewStage: number
}

interface ManagerDashboardClientProps {
  applications: ApplicationSummary[]
  reviewers: AvailableReviewer[]
  stats: DashboardStats
  teamPerformance: TeamMemberPerformance[]
}

const StatusBadge = ({ status }: { status: ApplicationStatusAPI }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full inline-block capitalize"
  const statusClasses: Record<ApplicationStatusAPI, string> = {
    "Pending Review": "bg-yellow-100 text-yellow-800",
    new: "bg-blue-100 text-blue-600",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status.replace("_", " ")}</span>
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [matches, query])
  return matches
}

const DropdownPortal = ({
  children,
  targetRect,
  onClose,
  isMobile,
}: { children: React.ReactNode; targetRect: DOMRect; onClose: () => void; isMobile: boolean }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const positionStyles = isMobile
    ? {
        position: "absolute" as const,
        top: `${targetRect.bottom + window.scrollY + 4}px`,
        right: `${window.innerWidth - targetRect.right - window.scrollX}px`,
      }
    : {
        position: "absolute" as const,
        top: `${targetRect.bottom + window.scrollY + 4}px`,
        left: `${targetRect.left + window.scrollX}px`,
      }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])
  return createPortal(
    <div
      ref={menuRef}
      style={positionStyles}
      className="w-48 bg-white rounded-md shadow-lg z-50 border border-gray-100"
    >
      {children}
    </div>,
    document.body,
  )
}

export default function ManagerDashboardClient({
  applications,
  reviewers,
  stats,
  teamPerformance,
}: ManagerDashboardClientProps) {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState<{ id: string; rect: DOMRect } | null>(null)
  const [isAssignMenuOpen, setIsAssignMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [assignReviewer, { isLoading: isSubmitting }] = useAssignReviewerMutation()
  const [activeFilter, setActiveFilter] = useState<ApplicationStatusAPI | "All">("All")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const uniqueStatuses = [...new Set(applications.map((app) => app.status))]
  const filteredApplications =
    activeFilter === "All" ? applications : applications.filter((app) => app.status === activeFilter)
  const filteredReviewers = reviewers.filter((r) => r.full_name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleToggleMenu = (appId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (openMenu?.id === appId) {
      setOpenMenu(null)
      setIsAssignMenuOpen(false)
    } else {
      const rect = event.currentTarget.getBoundingClientRect()
      setOpenMenu({ id: appId, rect })
      setIsAssignMenuOpen(false)
    }
  }
  const handleCloseAllMenus = () => {
    setOpenMenu(null)
    setIsAssignMenuOpen(false)
  }
  const handleAssignReviewer = async (applicationId: string, reviewerId: string) => {
    if (isSubmitting) return
    try {
      await assignReviewer({
        id: applicationId,
        reviewer: { reviewer_id: reviewerId },
      }).unwrap()
      alert("Reviewer assigned successfully!")
      handleCloseAllMenus()
      console.log("⏳ Waiting for backend to process update...")
      setTimeout(() => {
        console.log("🔄 Reloading page to refresh data...")
        window.location.reload()
      }, 800)
    } catch (error: any) {
      console.error("Failed to assign reviewer:", error)
      const errorMessage = error.data?.message || "An unexpected error occurred. Please check the console."
      alert(`Error: ${errorMessage}`)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-inter">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 font-poppins">Manager Dashboard</h1>
            <p className="text-gray-500 mt-1">07 November Intake</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalApplications}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.underReview}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Interview Stage</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.interviewStage}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-sm text-gray-600">Accepted</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.accepted}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 font-poppins">All Applications</h2>
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value as any)}
                  className="text-sm bg-gray-100 px-3 py-1.5 rounded-md border-transparent focus:border-indigo-500 focus:ring-0 cursor-pointer"
                >
                  <option value="All">Filter by Status</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status} className="capitalize">
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applicant
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Assigned Reviewer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {app.applicant_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.assigned_reviewer_name ? (
                            <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-800">
                              {app.assigned_reviewer_name}
                            </span>
                          ) : (
                            <span className="text-gray-400">Not Assigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={(e) => handleToggleMenu(app.id, e)}
                            disabled={isSubmitting}
                            className="flex items-center ml-auto text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                          >
                            Actions <IoChevronDown className="w-4 h-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredApplications.length === 0 && (
                  <div className="w-full text-center py-6 text-gray-500">No applications match this filter.</div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-4">Team Performance</h2>
              <div className="space-y-5">
                {teamPerformance.map((member) => (
                  <div key={member.name} className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {member.assignedCount} Assigned
                        <span className="text-gray-400"> / Avg. 2.5 days</span>
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-600 whitespace-nowrap">
                      {member.assignedCount} Reviews
                    </p>
                  </div>
                ))}
                {teamPerformance.length === 0 && (
                  <p className="text-sm text-gray-500">No reviewers currently have assigned applications.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {openMenu && (
        <DropdownPortal targetRect={openMenu.rect} onClose={handleCloseAllMenus} isMobile={isMobile}>
          <div className="py-1">
            <Link
              href={`/manager/manager_details/${openMenu.id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              View Details
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsAssignMenuOpen(!isAssignMenuOpen)}
                className="w-full text-left flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Assign to Reviewer <IoChevronForward className="w-4 h-4" />
              </button>

              {isAssignMenuOpen && (
                <div
                  className={`absolute top-0 w-56 bg-white rounded-md shadow-lg z-30 border border-gray-100 ${isMobile ? "right-full mr-1" : "left-full ml-1"}`}
                >
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search for a reviewer"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                    />
                  </div>
                  <div className="py-1 max-h-48 overflow-y-auto">
                    {filteredReviewers.map((reviewer) => (
                      <a
                        key={reviewer.id}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAssignReviewer(openMenu.id, reviewer.id)
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUser className="w-4 h-4 mr-3" /> {reviewer.full_name}
                      </a>
                    ))}
                    {filteredReviewers.length === 0 && (
                      <p className="text-center text-xs text-gray-500 py-2">No reviewers found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DropdownPortal>
      )}
    </>
  )
}
