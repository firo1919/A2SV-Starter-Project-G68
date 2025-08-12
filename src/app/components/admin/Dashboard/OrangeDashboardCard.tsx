import React from 'react'

interface CardType {
    count: number
}

const OrangeDashboardCard = ({count}: CardType) => {
  return (
    <div className='h-fit p-4 w-[90%] sm:w-[389px] rounded-2xl bg-gradient-to-b from-[#EAB308] to-[#EA580C] shadow-[0_6px_8px_-1px_rgba(0,0,0,0.05)]'>
        <h1 className='font-medium text-[#E0E7FF]'>Active Cycles</h1>
        <p className='font-semibold text-[#FFFFFF] text-[30px]'>{count}</p>
    </div>
  )
}

export default OrangeDashboardCard