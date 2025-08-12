import Link from 'next/link'
import React from 'react'

interface CardType {
    title: string,
    content: string
}

const DashboardRecentActivityCard = ({title, content}: CardType) => {
  return (
    <div className='flex flex-col gap-3 p-4 pb-[200px] shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_2px_6px_rgba(0,0,0,0.1)] bg-white rounded'>
        <h1 className='font-bold text-[20px] text-[#111827]'>Recent Admin Activity</h1>
        <p>{content}</p>
    </div>
  )
}

export default DashboardRecentActivityCard