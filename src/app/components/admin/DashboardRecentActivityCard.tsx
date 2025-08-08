import Link from 'next/link'
import React from 'react'

interface CardType {
    title: string,
    content: string
}

const DashboardRecentActivityCard = ({title, content}: CardType) => {
  return (
    <div className='p-4 pb-[358px] w-[90%] sm:w-[389px] shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_2px_6px_rgba(0,0,0,0.1)] bg-white rounded'>
        <h1>{title}</h1>
        <p>{content}</p>
    </div>
  )
}

export default DashboardRecentActivityCard