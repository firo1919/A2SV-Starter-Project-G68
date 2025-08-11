import { getData } from '@/utils/adminUtils'
import AdminCyclesClient from '@/app/components/admin/Cycles/ClientAdminCycles'
import Header from '@/app/components/Header'
import BurgerMenu from '@/app/components/BurgerMenu'
import SignOut from '@/app/components/SignOut'
import Link from 'next/link'

const Page = async () => {
  const res = await getData()
  const cycles = res?.data?.cycles ?? []
  const total = res?.data.total_count

  return (
  <div>
      <Header>
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 flex gap-6 justify-center">
            <Link href='/admin/dashboard' className="text-md font-normal">Dashboard</Link>
            <Link href='/admin/users' className="text-md font-normal">Users</Link>
            <Link href='/admin/cycles' className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Cycles</Link>
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
      <AdminCyclesClient initialCycles={cycles} total_count={total} />
  </div> 
  )
}

export default Page
