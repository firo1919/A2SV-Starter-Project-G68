'use client'
import React from 'react'
import { useRouter } from "next/navigation";

const CyclesButton = () => {

  const useGoToCreateCycle = () => {
    const router = useRouter();

    return () => {
      router.push("/admin/create-cycles");
    };
  };

  return (
    <div>
        <button onClick={useGoToCreateCycle()} className='bg-[#4F46E5] text-white rounded px-[16px] py-[8px] sm:px-[8px] sm:[4px] font-normal'>Create New Cycle</button>
    </div>
  )
}

export default CyclesButton