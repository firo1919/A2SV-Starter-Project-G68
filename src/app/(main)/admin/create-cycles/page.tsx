import CreateCycleForm from '@/app/components/admin/CreateCycle/CreateCycleForm'
import BurgerMenu from '@/app/components/BurgerMenu'
import Header from '@/app/components/Header'
import SignOut from '@/app/components/SignOut'
import Link from 'next/link'
import React from 'react'

const CreateCyclesPage = () => {
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
      <div className='flex flex-col items-center'>
          <div className='w-9/10 md:w-[1216px] p-4 flex flex-col items-start'>
              <h1 className="font-bold text-[25px] md:text-[30px]">Create new cylce</h1>
              <p className='font-normal text-[#4B5563]'>Use this form to create a new cycle and assign periods.</p>
          </div>
          <div className='w-9/10 md:w-[1216px] p-4'>
              <CreateCycleForm />
          </div>
      </div>
    </div>

  )
}

export default CreateCyclesPage