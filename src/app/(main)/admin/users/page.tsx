//app/(main)/admin/users/page.tsx
import ClientUsersPage from '@/app/components/admin/Users/ClientUsersPage';
import BurgerMenu from '@/app/components/BurgerMenu';
import Header from '@/app/components/Header';
import SignOut from '@/app/components/SignOut';
import { getUsersData } from '@/utils/adminUtils'
import Link from 'next/link';
import React from 'react'

const UsersPage = async () => {
    const res = await getUsersData();
    const users = res?.data?.users ?? []
    const total = res?.data?.total_count
    console.log(users)    
  return (
    <div>
        <Header>
          <div className="flex w-full items-center justify-between">
            <div className="flex-1 flex gap-6 justify-center">
              <Link href='/admin/dashboard' className="text-md font-normal">Dashboard</Link>
              <Link href='/admin/users' className="text-md font-normal border-b-2 border-[#4F46E5] pb-1">Users</Link>
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
        <ClientUsersPage initialUsers={users} total_count={total} />
    </div>
  )
}

export default UsersPage