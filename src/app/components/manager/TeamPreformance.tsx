
import React from 'react'

const TeamPreformance = () => {
  return (
    <div className="border w-90 bg-white mt-9 mt-10">
      <h1 className="text-black font-bold pt-5 text-[25px] mt-"> <strong> Team Performance </strong> </h1>
      <ul className="text-black">
        <li className="flex gap-5 mb-3" >
            <div className="">
                <h1 className=" font-bold mb-2">Jane R.</h1>
                <p className ="text-gray-700 mb-2">3 assigned / avg 2.5 days</p>
            </div>
            <p className="text-black/60 " >12 Reviews</p> <hr />
        </li>
        <li className="flex gap-6">
            <div className="">
                <h1 className="font-bold">Mile R.</h1>
                <p className="text-gray-700">5 assigned / avg 3.1 days</p>
            </div>
            <p className="text-black/60">8 Reviews</p>
        </li>
      </ul>
    </div>
  )
}

export default TeamPreformance
