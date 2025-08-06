
import React from 'react'
import StatusCard from '@/app/components/manager/StatusCard'
import AllApplication from '@/app/components/manager/AllApplication'
import TeamPreformance from '@/app/components/manager/TeamPreformance'

const ManagerPage = () => {
  return (
    
        <div>
            <h1 className=" font-bold text-2xl ml-50 mt-4 text-black " >Manager Dashboard</h1>
            <p className=" text-gray-400 mb-5 ml-50 " >G7 November Intake</p>
            <div className="flex gap-5 ml-28 ">
                <StatusCard title="Total Application" value = "1,204" />
                <StatusCard title="Under Review" value = "705" />
                <StatusCard title="Interview Stage" value = "250" />
                <StatusCard title="Accepted" value = "82" />
            </div>
            <div className="flex gap-3">
                <AllApplication/>
                <TeamPreformance/>
            </div>
                
        </div>

  )
}

export default ManagerPage
