import Link from 'next/link'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'


const DashboardAnalysisCard = () => {
  return (
    <div className='flex flex-col gap-3 p-4 pb-[50px] w-[90%] md:w-[1000px] shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_2px_6px_rgba(0,0,0,0.1)] bg-white rounded'>
        <h1 className='font-bold text-[20px] text-[#111827]'>View Analytics</h1>
        <p className='font-normal text-[16px] text-[#4B5563]'>Explore application data and platform insights.</p>
        <Link className='text-[#4F46E5] font-semibold text-[16px]' href='/admin/users'>Go to Analytics <ArrowForwardIcon /></Link>
    </div>
  )
}

export default DashboardAnalysisCard