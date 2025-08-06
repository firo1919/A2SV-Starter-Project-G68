import ApplicationCard from "./application-card"
import { Application } from "./types"

export default function ApplicationGrid() {
  // Dummy data for demonstration
  const applications: Application[] = [
    {
      id: "1",
      name: "Abel Tadesse",
      submittedDate: "Oct 23, 2023",
      status: "under-review",
      avatarUrl: "/images/abel.png"
    },
    {
      id: "2",
      name: "Bethlehem Tadesse",
      submittedDate: "Oct 24, 2023",
      status: "review-complete",
      avatarUrl: "/images/betty.png"
    },
    {
      id: "3",
      name: "Caleb Alemayehu",
      submittedDate: "Oct 25, 2023",
      status: "under-review",
      avatarUrl: "/images/caleb.png"
    },
    {
      id: "4",
      name: "Abel Tadesse",
      submittedDate: "Oct 23, 2023",
      status: "new",
      avatarUrl: "/images/abel.png"
    },
    {
      id: "5",
      name: "Bethlehem Tadesse",
      submittedDate: "Oct 24, 2023",
      status: "new",
      avatarUrl: "/images/betty.png"
    },
    {
      id: "6",
      name: "Caleb Alemayehu",
      submittedDate: "Oct 25, 2023",
      status: "new",
      avatarUrl: "/images/caleb.png"
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
}
