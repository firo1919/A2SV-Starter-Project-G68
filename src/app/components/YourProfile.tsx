'use client';
import Image from "next/image";

export default function YourProfile() {
  return (
    <div className="w-[832px] mx-auto">
      <div className="relative w-full h-[256px] bg-profile-bg bg-cover bg-center rounded-lg my-8">
        <Image
          src="/images/profile.png"
          alt="Profile Background"
          fill
          className="rounded-lg object-cover"
        />
        <div className="absolute bottom-[-130px] left-6 -translate-y-1/2 flex items-center gap-4">
          <Image
            src="/images/photo.png"
            alt="Profile Photo"
            width={128}
            height={128}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex flex-col mt-10">
            <p className="text-lg font-semibold mt-2">Abebe Kebede</p>
            <p className="text-sm ">abe@a2sv.org</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-32">
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              placeholder="Enter your role"
              className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full h-[62px] bg-[#F9FAFB] px-6 py-3 flex justify-end items-center rounded-md">
            <button className="bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[6px] text-sm font-medium shadow-sm hover:bg-indigo-700 transition">
              Save Change
            </button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-10 mb-6">Change Password</h3>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full max-w-[515px] h-[44px] px-4 rounded-md border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full h-[62px] bg-[#F9FAFB] px-6 py-3 flex justify-end items-center rounded-md">
            <button className="h-[50px] bg-[#4F46E5] text-white px-[17px] py-[9px] rounded-[6px] text-sm font-medium shadow-sm hover:bg-indigo-700 transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
