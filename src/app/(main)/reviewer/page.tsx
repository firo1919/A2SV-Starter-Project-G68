import React from 'react'
import AssignedApplications from '@/app/components/reviewer/assigned-applications'
import ApplicationGrid from '@/app/components/reviewer/application-grid'
import Pagination from '@/app/components/reviewer/pagination'

function page() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <AssignedApplications />
      <ApplicationGrid />
      <Pagination currentPage={1} itemsPerPage={6} totalItems={42} />
    </main>
  )
}

export default page