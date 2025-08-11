import React from 'react'


interface TotalCardProps {
  value: number
}

const TotalCard = ({ value }: TotalCardProps) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-[0_6px_8px_-1px_rgba(0,0,0,0.2)]'>
        <h2 className='text-[#6B7280] font-medium text-[14px]'>Total Applicants</h2>
        <h1 className='text-[#111827] font-semibold text-[30px]'>{value}</h1>
    </div>
  )
}

export default TotalCard