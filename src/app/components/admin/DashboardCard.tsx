import Link from 'next/link'
import React from 'react'

interface CardType {
    title: string,
    content: string,
    link_url: string,
    link_name: string
}

const DashboardCard = ({title, content, link_url, link_name}: CardType) => {
  return (
    <div className='p-4 pb-[358px] w-[90%] sm:w-[389px] shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_2px_6px_rgba(0,0,0,0.1)] bg-white rounded'>
        <h1>{title}</h1>
        <p>{content}</p>
        <Link className='text-[#4F46E5]' href={link_url}>Go to {link_name} ..arrow here..</Link>
    </div>
  )
}

export default DashboardCard