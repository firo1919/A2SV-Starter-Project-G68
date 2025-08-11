import { useDeleteCycleMutation } from '@/lib/redux/api/adminApiSlice'
import React from 'react'

interface CycleCardType {
    id: number,
    title: string,
    content: string,
    country: string,
    status: boolean,
    onDelete: (id: number) => void
    onActivate: (id: number) => void;
    onDeactivate: (id: number) => void;
}

const CyclesCard = ({id, title, content, country, status, onDelete, onActivate, onDeactivate,}: CycleCardType) => {
  return (
    <div className='flex flex-col justify-start bg-white p-[15px] md:p-[20px] lg:w-[384px] h-fit lg:h-[168px] gap-2 rounded shadow-[2px_2px_6px_rgba(0,0,0,0.1),-2px_2px_6px_rgba(0,0,0,0.1)]'>
        <div className='flex justify-between pr-[1rem]'>
            <h2 className="text-[#111827] font-semibold text-[16px] sm:text-[18px]">{title}</h2>
            <div className='flex gap-1'>
                <button
                    onClick={() => onDelete(id)}
                    className={`px-[16px] max-h-8 py-[4px] rounded text-white ${
                        status === false
                            ? 'bg-[#4F46E5]'
                            : 'bg-[#E57046]'
                    }`}
                >
                    close
                </button>
                <button 
                    onClick={() => (status ? onDeactivate(id) : onActivate(id))}
                    className={`px-[16px] max-h-8 py-[4px] rounded text-white ${
                        status === false
                            ? 'bg-[#16A34A]'
                            : 'bg-[#6B7280]'
                    }`}
                >
                    {status === true ? "Deactivate" : "Activate"}
                </button>
            </div>
        </div>
        <div>
            <p className='text-[#4B5563] font-normal text-[14px] sm:text-[16px]'>{content}</p>
        </div>
        <div className='flex justify-between'>
            <h3 className='text-[#4B5563] font-normal text-[12px] sm:text-[14px]'>Country: <span className='text-[#6B7280] font-semibold'>{country}</span></h3>
            <h3 className='text-[#4B5563] font-normal text-[12px] sm:text-[14px]'>status: <span className={`font-semibold ${
                    status === false
                        ? 'text-[#6B7280]'
                        : 'text-[#16A34A]'
                }`}>{status === true ? "Active" : "Closed"}</span></h3>
        </div>
    </div>
  )
}

export default CyclesCard