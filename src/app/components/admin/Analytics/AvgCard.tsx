import React from 'react'

interface AvgCardProps {
  value: number
}

const AvgCard = ({value}: AvgCardProps) => {
  return (
    <div className='p-6 bg-white rounded-2xl shadow-[0_6px_8px_-1px_rgba(0,0,0,0.2)]'>
        <h2 className='text-[#6B7280] font-medium text-[14px]'>Avg. Review Time</h2>
        <h1 className='text-[#111827] font-semibold text-[30px]'>{value}Days</h1>
    </div>
  )
}

export default AvgCard