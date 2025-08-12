
import React from 'react'

const TeamPreformance = () => {
  return (
    <div className="border border-none w-85 bg-white mt-10 ml-15 py-4 px-5">
      <h1 className="text-black font-bold text-[25px] mb-2 "> <strong> Team Performance </strong> </h1>
      <ul className="text-black">
        <li className="flex mb-3" >
            <div className="">
                <h1 className=" font-bold mb-2">Jane R.</h1>
                <p className ="text-gray-700 mb-2">3 assigned / avg 2.5 days</p>
            </div>
            <p className="text-black/40 " >12 Reviews</p> 
        </li> <hr className='text-gray-400' />
      </ul>
    </div>
  )
}

export default TeamPreformance
