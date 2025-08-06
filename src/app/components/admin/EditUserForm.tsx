'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools"

type FormTypes = {
    full_name: string,
    email_address: string,
    password: string,
    role: string
}

const EditNewUserForm = () => {
    const form = useForm<FormTypes>({
        defaultValues: {
            full_name: "",
            email_address: "",
            password: "",
            role: "Applicant"
        }
    });
  const { register, control, handleSubmit, formState } = form;
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  function submitFunc () {
    // write submit function here
  }


  return (
    <div>
        <form className='flex flex-col p-4 bg-white w-fit' onSubmit={handleSubmit(submitFunc)} noValidate>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-full lg:w-[1216px] bg-white gap-2'>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="full_name">Full name</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='full_name' {...register("full_name", {required: "please enter cycle name"})}/>
                    <p className= 'text-red-600'>{errors.full_name?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="email_address">Email address</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="email" id='email_address' {...register("email_address", {required: "please enter your email_address"})}/>
                    <p className= 'text-red-600'>{errors.email_address?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="password">Password</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="password" id='password' placeholder='Set a new password (optional)' {...register("password")}/>
                    <p className= 'text-red-600'>{errors.password?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="role">Role</label>
                    <select className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full border-[#D1D5DB] border-1 rounded py-1' id='role' {...register("role", {required: "please enter the end date"})}>
                        <option value="applicant">Applicant</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                    <p className= 'text-red-600'>{errors.role?.message}</p>
                </div>
            </div>
        
            <div className='bg-[#F9FAFB] flex justify-end p-2 gap-6'>
                <button className='bg-white text-[#111111] border-[#D1D5DB] border-1 rounded py-2 px-4'>Cancel</button>
                <button className='text-white bg-[#4F46E5] rounded py-2 px-4'>Update User</button>
            </div>
        </form>
        <DevTool control={control}/>
    </div>
  )
}

export default EditNewUserForm