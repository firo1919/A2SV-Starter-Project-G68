import React from 'react'

interface CardType {
    title: string,
    count: number
}

const OrangeDashboardCard = ({title, count}: CardType) => {
  return (
    <div className='h-fit p-4 w-[90%] sm:w-[389px] rounded-2xl bg-gradient-to-b from-[#EAB308] to-[#EA580C]'>
        <h1 className='font-medium text-[#E0E7FF]'>{title}</h1>
        <p className='font-semibold text-[#FFFFFF] text-[30px]'>{count}</p>
    </div>
  )
}

export default OrangeDashboardCard