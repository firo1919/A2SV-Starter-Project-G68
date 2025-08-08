import EditNewUserForm from '@/app/components/admin/EditUserForm'
import { getUsersData } from '@/utils/adminUtils';
import React from 'react'

const UpdateUserPage = async () => {
  return (
    <div className='flex flex-col items-center'>
        <div className='w-9/10 md:w-[1216px] p-4 flex flex-col items-start'>
            <h1 className="font-bold text-[25px] md:text-[30px]">Edit User: Jane Reviewer</h1>
            <p className='font-normal text-[#4B5563]'>Update the user's details and role.</p>
        </div>
        <div className='w-9/10 md:w-[1216px] p-4'>
            <EditNewUserForm />
        </div>
    </div>
  )
}

export default UpdateUserPage