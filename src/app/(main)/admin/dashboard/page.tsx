import DonutChart from '@/app/components/admin/Analytics/DonutChart'
import FunnelCard from '@/app/components/admin/Analytics/FunnelCard'
import BurgerMenu from '@/app/components/BurgerMenu'
import Header from '@/app/components/Header'
import { getActiveCyclesData, getAnalysisData, getUsersData } from '@/utils/adminUtils'
import React from 'react'
import Link from "next/link";
import GeographicDistCard from '@/app/components/admin/Analytics/GeographicDistCard'
import TotalCard from '@/app/components/admin/Analytics/TotalCard'
import AcceptCard from '@/app/components/admin/Analytics/AcceptCard'
import AvgCard from '@/app/components/admin/Analytics/AvgCard'
import BlueDashboardCard from '@/app/components/admin/Dashboard/BlueDashboardCard'
import GreenDashboardCard from '@/app/components/admin/Dashboard/GreenDashboardCard'
import OrangeDashboardCard from '@/app/components/admin/Dashboard/OrangeDashboardCard'
import DashboardManagerCard from '@/app/components/admin/Dashboard/DashboardCard'
import DashboardCyclesCard from '@/app/components/admin/Dashboard/DashboardCyclesCard'
import DashboardRecentActivityCard from '@/app/components/admin/Dashboard/DashboardRecentActivityCard'
import DashboardAnalysisCard from '@/app/components/admin/Dashboard/DashboardViewCard'
import SignOut from '@/app/components/SignOut'


const DashboardPage = async () => {
  const res = await getAnalysisData()
  const userRes = await getUsersData();
  const activeCycles = await getActiveCyclesData();
  const activeCyclesTotal = activeCycles?.data.total_count
  const usersTotal = userRes?.data.total_count
  const analysis = res?.data
  return (
    <div className='flex flex-col justify-center'>
		<Header>
			<div className="flex w-full items-center justify-between">
				<div className="flex-1 flex gap-6 justify-center">
					<Link href='/admin/dashboard' className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Dashboard</Link>
					<Link href='/admin/users' className="text-md font-normal">Users</Link>
					<Link href='/admin/cycles' className="text-md font-normal">Cycles</Link>
					<Link href='/admin/analytics' className="text-md font-normal">Analytics</Link>
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
                <h1 className='font-bold text-[#111827] text-[30px]'>Admin Command Center</h1>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-3 gap-4 w-9/10 md:w-[1280px]'>
                <BlueDashboardCard count={usersTotal} />
                <GreenDashboardCard count={analysis?.total_applicants} />
                <OrangeDashboardCard count={activeCyclesTotal} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 w-9/10 md:w-[1280px] gap-6 justify-self-center'>
                <DashboardManagerCard />
                <DashboardCyclesCard />
                <DashboardRecentActivityCard title={''} content={''} />
            </div>
            <DashboardAnalysisCard />
        </div>
    </div>
  )
}

export default DashboardPage