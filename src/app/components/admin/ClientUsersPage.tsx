//app/components/admin/ClientUsersPage.tsx
'use client'
import { UsersType } from '@/types/AdminTypes'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import React, { useState } from 'react'
import UserCard from './UserCard'
import UsersButton from './UsersButton'
import { deleteUserById } from '@/utils/adminUtils';

interface AdminUsersPageTypes {
    initialUsers: UsersType[],
    total_count: number | null
}

const ClientUsersPage = ({initialUsers, total_count}: AdminUsersPageTypes) => {
  const [users, setUsers] = useState(initialUsers)
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 5

  const totalPages = Math.ceil(users.length / itemPerPage)
  const firstItemIndex = (currentPage - 1) * itemPerPage
  const lastItemIndex = currentPage * itemPerPage
  const thisPageItems = users.slice(firstItemIndex, lastItemIndex)    

const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    const success = await deleteUserById(id);
    if (success) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } else {
      alert("Failed to delete user");
    }
  };

  return (
    <div className='flex flex-col gap-4 md:gap-8 items-center'>
        <div className="flex w-full md:w-[1280px] justify-between p-4 md:p-10 items-center">
            <div>
                <h1 className="font-bold text-[25px] md:text-[30px]">User Management</h1>
                <p className='font-normal text-[#4B5563]'>Administer and manage all users on the platform.</p>
            </div>
            <UsersButton />
        </div>
        <div className='flex w-9/10 md:w-98% md:w-[1240px] mx-auto bg-white p-2 rounded gap-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.09)]'>
            <input className='w-9/10 p-3 rounded border-[#E5E7EB] border-2' type="text" placeholder='Search users by name or email...'/>
            <button className='bg-[#E0E7FF] p-3 rounded border-[#E5E7EB] border-2'>All Roles</button>
        </div>
        <div className='flex flex-col w-9/10 md:w-[1240px] mx-auto'>
            <div className='flex justify-between w-full bg-[#F9FAFB] p-4'>
                <h1>NAME</h1>
                <h2>ROLE</h2>
                <h2>STATUS</h2>
                <h2></h2>
            </div>
            {thisPageItems.map((user) => (
                    <UserCard key={user.id} id={user.id} profile={''} username={user.full_name} user_email={user.email} role={user.role} status={"Active"} onDelete={handleDelete} />
                )
            )}
        </div>
        <div className="flex justify-between items-center w-9/10 md:w-[1240px] mt-4 md:mt-10 mb-4 md:mb-25">
            <p>
            Showing {firstItemIndex + 1} to {Math.min(lastItemIndex, users.length)} of {total_count} results
            </p>
            <div className="flex items-center">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-200 px-3 py-1 disabled:opacity-50 text-[#6B7280]"
            >
                <ArrowBackIcon />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 ${
                    page === currentPage
                    ? 'bg-[#EEF2FF] text-[#6366F1] border-[#6366F1] border'
                    : 'bg-white text-[#6B7280] border border-[#D1D5DB]'
                }`}
                >
                {page}
                </button>
            ))}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-gray-200 px-3 py-1 disabled:opacity-50 text-[#6B7280]"
            >
                <ArrowForwardIcon />
            </button>
            </div>
        </div>
    </div>
  )
}

export default ClientUsersPage