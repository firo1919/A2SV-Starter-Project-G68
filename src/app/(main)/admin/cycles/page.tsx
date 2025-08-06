import React from 'react'
import CyclesCard from '@/app/components/admin/CyclesCard'
import CyclesButton from '@/app/components/admin/CyclesButton'

const cycle = {
  title: "G7 registration",
  content: "sjdnkjdcjsbcjb dsjcnkcndc dkjcnkjsn dnckjn kjdnckn",
  country: "Ethiopia",
  status: "Active"
}

const AdminCycles = () => {
  return (
    <div>
      <CyclesButton />
      <CyclesCard title={cycle.title} content={cycle.content} country={cycle.country} status={cycle.status}/>
    </div>
  )
}

export default AdminCycles