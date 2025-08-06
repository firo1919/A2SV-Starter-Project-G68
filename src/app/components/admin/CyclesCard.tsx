import React from 'react'

interface CycleCardType {
    title: string,
    content: string,
    country: string,
    status: string
}

const CyclesCard = ({title, content, country, status}: CycleCardType) => {
  return (
    <div className='flex flex-col bg-white lg:p-[20px] sm:p-[10px] lg:w-[384px] sm:w-[90%] h-[168px] gap-2 rounded shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_2px_6px_rgba(0,0,0,0.1)]'>
        <div className='flex justify-between pl-[1rem]'>
            <h2 className="text-[#111827] font-semibold text-[18px]">{title}</h2>
            <button
                className={`px-[16px] py-[4px] rounded text-white ${
                    status.toLowerCase() === 'closed'
                        ? 'bg-[#4F46E5]'
                        : 'bg-[#E57046]'
                }`}
            >
                close
            </button>
        </div>
        <div>
            <p className='text-[#4B5563] font-normal text-[16px]'>{content}</p>
        </div>
        <div className='flex justify-between'>
            <h3 className='text-[#4B5563] font-normal text-[14px]'>Country: <span className='text-[#6B7280] font-semibold'>{country}</span></h3>
            <h3 className='text-[#4B5563] font-normal text-[14px]'>status: <span className={`font-semibold ${
                    status.toLowerCase() === 'closed'
                        ? 'text-[#6B7280]'
                        : 'text-[#16A34A]'
                }`}>{status}</span></h3>
        </div>
    </div>
  )
}

export default CyclesCard