"use client";

import { useState } from "react";
import EditNewUserForm from "@/app/components/admin/UpdateUsers/EditUserForm";
import { UsersType } from "@/types/AdminTypes";

interface Props {
  users: UsersType[];
}

export default function EditUserClientWrapper({ users }: Props) {
  const [username, setUsername] = useState<string>("");

  return (
    <div className="flex flex-col items-center">
      <div className="w-9/10 md:w-[1216px] p-4 flex flex-col items-start">
        <h1 className="font-bold text-[25px] md:text-[30px]">
          Edit User: {username || "Loading..."}
        </h1>
        <p className="font-normal text-[#4B5563]">
          Update the user's details and role.
        </p>
      </div>
      <div className="w-9/10 md:w-[1216px] p-4">
        <EditNewUserForm users={users} onUserNameFound={setUsername} />
      </div>
    </div>
  );
}
