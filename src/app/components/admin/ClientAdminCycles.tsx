//app/components/admin/ClientAdminCycles.tsx
'use client'

import React, { useState } from 'react'
import CyclesCard from '@/app/components/admin/CyclesCard'
import CyclesButton from '@/app/components/admin/CyclesButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { CycleType } from '@/types/AdminTypes'

const cycleType = {
  title: 'G7 registration',
  content: 'Place holder description for cycle cards since it is not provided',
  country: 'PH country',
  status: 'Active',
}

interface AdminCyclesPageTypes {
    initialCycles: CycleType[],
    total_count: number | null
}

const AdminCyclesClient = ({ initialCycles, total_count }: AdminCyclesPageTypes) => {
  const [cycles] = useState(initialCycles)
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 4

  const totalPages = Math.ceil(cycles.length / itemPerPage)
  const firstItemIndex = (currentPage - 1) * itemPerPage
  const lastItemIndex = currentPage * itemPerPage
  const thisPageItems = cycles.slice(firstItemIndex, lastItemIndex)

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full md:w-[1280px] justify-between p-4 md:p-10 items-center">
        <h1 className="font-bold text-[25px] md:text-[30px]">Application Cycles</h1>
        <CyclesButton />
      </div>
      <div className="w-9/10 md:w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {thisPageItems.map((cycle) => (
          <CyclesCard
            key={cycle.id}
            title={cycle.name}
            content={cycleType.content}
            country={cycleType.country}
            status={cycle.is_active}
          />
        ))}
      </div>
      <div className="flex justify-between items-center w-9/10 md:w-[1240px] mt-4 md:mt-10 mb-4 md:mb-25">
        <p>
          Showing {firstItemIndex + 1} to {Math.min(lastItemIndex, cycles.length)} of {total_count} cycles
        </p>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-200 px-3 py-1 disabled:opacity-50 text-[#6B7280]"
          >
            <ArrowBackIcon />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 ${
                page === currentPage
                  ? 'bg-[#EEF2FF] text-[#6366F1] border-[#6366F1] border'
                  : 'bg-white text-[#6B7280] border border-[#D1D5DB]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-200 px-3 py-1 disabled:opacity-50 text-[#6B7280]"
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminCyclesClient
