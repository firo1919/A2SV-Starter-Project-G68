//app/components/admin/UserCard.tsx
import React from 'react'

interface UserType {
    id: string,
    profile: string,
    username: string,
    user_email: string,
    role: string,
    status: string
    onDelete: (id: string) => void
}

const UserCard = ({id, profile, username, user_email, role, status, onDelete}: UserType) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 justify-between bg-white p-4 items-center gap-8 w-9/10 md:w-full'>
        <div className='flex gap-1 w-full p-1'>
            <img className='w-15 h-15 rounded-4xl' src={profile|| "https://images5.alphacoders.com/100/1002716.jpg"} alt="" />
            <div className='flex flex-col gap-0.5'>
                <h2 className='font-medium text-[#111827]'>{username}</h2>
                <p className='font-normal text-[#6B7280]'>{user_email}</p>
            </div>
        </div>
        <div className='flex justify-start w-full px-16'>
            <h2 className='font-normal text-[#6B7280]'>{role}</h2>
        </div>
        <div className='flex justify-start w-full'>
            <h2 className={`px-2 py-0.5 w-fit rounded-2xl font-semibold ${status.toLowerCase() === "active" ? 'bg-[#DBEAFE] text-[#166534]' : 'bg-[#FEF9C3] text-[#854D0E]'}`}>{status}</h2>
        </div>
        <div className='flex justify-end gap-6 w-full px-8'>
            <button className='font-medium bg-transparent text-[#4F46E5]'>Edit</button>
            <button className='font-medium bg-transparent text-[#DC2626]' onClick={() => onDelete(id)}>Delete</button>
        </div>
    </div>
  )
}

export default UserCard