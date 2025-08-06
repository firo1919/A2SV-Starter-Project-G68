import { CustomButton } from "./custom-button"

export default function AssignedApplications() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-8 py-6 grey:bg-gray-50">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Assigned Applications</h1>
        <p className="text-base text-gray-600">You have 5 applications waiting for your review.</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <CustomButton style={{ backgroundColor: "#4F46E5", color: "#fff" }}>All</CustomButton>
          <CustomButton variant="outline" style={{ backgroundColor: "#E5E7EB" }}>Under Review</CustomButton>

          <CustomButton variant="outline" style={{ backgroundColor: "#E5E7EB" }}>Complete</CustomButton>
        </div>
        <CustomButton variant="outline"style={{backgroundColor: "#F3F4F6",border: "1px solid #D1D5DB", color: "#111827" }}>Sort by Submission Date</CustomButton>
      </div>
    </div>
  )
}
