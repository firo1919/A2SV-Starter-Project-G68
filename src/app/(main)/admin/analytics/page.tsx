import DonutChart from '@/app/components/admin/Analytics/DonutChart'
import FunnelCard from '@/app/components/admin/Analytics/FunnelCard'
import BurgerMenu from '@/app/components/BurgerMenu'
import Header from '@/app/components/Header'
import { getAnalysisData } from '@/utils/adminUtils'
import React from 'react'
import Link from "next/link";
import GeographicDistCard from '@/app/components/admin/Analytics/GeographicDistCard'
import TotalCard from '@/app/components/admin/Analytics/TotalCard'
import AcceptCard from '@/app/components/admin/Analytics/AcceptCard'
import AvgCard from '@/app/components/admin/Analytics/AvgCard'
import SignOut from '@/app/components/SignOut'


const AnalyticsPage = async () => {
  const res = await getAnalysisData()
  const analysis = res?.data
  return (
    <div className='flex flex-col justify-center'>
		<Header>
			<div className="flex w-full items-center justify-between">
				<div className="flex-1 flex gap-6 justify-center">
					<Link href='/admin/dashboard' className="text-md font-normal">Dashboard</Link>
					<Link href='/admin/users' className="text-md font-normal">Users</Link>
					<Link href='/admin/cycles' className="text-md font-normal">Cycles</Link>
					<Link href='/admin/analytics' className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Analytics</Link>
				</div>
				<div className="hidden md:flex gap-6 mr-[26px] items-center">
					<Link href='' className="text-sm font-semibold text-[#4F46E5]">Your Profile</Link>
					<Link href='' className="text-sm font-semibold text-gray-600">Admin User</Link>
					<SignOut />
				</div>
				<div className="md:hidden flex items-center">
					<BurgerMenu>
						<div className="flex flex-col gap-4 mt-4">
							<p className="text-sm font-semibold text-[#4F46E5]">Your Profile</p>
							<p className="text-sm font-semibold text-gray-600">Admin User</p>
							<SignOut />
						</div>
					</BurgerMenu>
				</div>
			</div>
		</Header>
		<div className='flex flex-col gap-4 md:gap-8 my-8 w-full items-center p-3 md:p-6'>
			<div className='flex flex-col w-9/10 md:w-[1280px] justify-start'>
				<h1 className='font-bold text-[#111827] text-[30px]'>Application Analytics</h1>
				<p className='text-[#4B5563] font-normal text-[16px]'>Insights for the G7 November Intake</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-9/10 md:w-[1280px]'>
				<TotalCard value={analysis?.total_applicants} />
				<AcceptCard value={analysis?.acceptance_rate} />
				<AvgCard value={analysis?.average_review_time_days} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 w-9/10 md:w-[1280px] gap-6 justify-self-center'>
				<FunnelCard analysis={analysis}/>
				<DonutChart analysis={analysis}/>
			</div>
			<GeographicDistCard analysis={analysis}/>
		</div>
    </div>
  )
}

export default AnalyticsPage