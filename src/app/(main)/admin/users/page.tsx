//app/(main)/admin/users/page.tsx
import ClientUsersPage from '@/app/components/admin/ClientUsersPage';
import { getUsersData } from '@/utils/adminUtils'
import React from 'react'

const UsersPage = async () => {
    const res = await getUsersData();
    const users = res?.data?.users ?? []
    const total = res?.data?.total_count
    console.log(users)    
  return (
    <div>
        <ClientUsersPage initialUsers={users} total_count={total} />
    </div>
  )
}

export default UsersPage