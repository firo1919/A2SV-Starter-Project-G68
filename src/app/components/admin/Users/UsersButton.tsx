import { useRouter } from 'next/navigation';
import React from 'react'

const UsersButton = () => {

    const useGoToCreateUser = () => {
      const router = useRouter();
  
      return () => {
        router.push("/admin/create-user");
      };
    };
    return (
      <div>
          <button onClick={useGoToCreateUser} className='bg-[#4F46E5] text-white rounded px-[16px] py-[8px] sm:px-[8px] sm:[4px] font-normal'>Create New User</button>
      </div>
    )
}

export default UsersButton