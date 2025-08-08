
import React from 'react'

const ManagerAction = () => {
  return (
    <div className='w-100 h-90 bg-white py-5 px-4 ml-25 mt-6 space-y-6 border border-none '>
      <h1 className='text-black  mb-3'> <strong>  Manager Actions</strong></h1>

      <div className="">
        <p className="text-gray-900 mb-1">Assign Reviewer</p>
        <p className='bg-gray-100 text-black mb-5'>Jane R.</p>
      </div>
      <button className='text-white bg-purple-900 cursor-pointer w-33 h-12 rounded-[4px] mb-7' >confirm</button> 
      <hr className="text-gray-200" />

      <div className="mt-4">
        <h2 className=" mb-1 "> <strong>Final Decision </strong></h2>
        <p className="mb-2">This action is final and will notify the applicant</p>
      </div>

      <div className="flex gap-3 mt-3">
        <button className="text-white w-43 h-9 rounded-[5px]  cursor-pointe bg-alizarin-crimson ">Reject</button>
        <button className="text-white w-43 h-9 rounded-[5px]  cursor-pointe bg-green-700 ">Accept</button>
        
      </div>

    </div>
  )
}

export default ManagerAction
