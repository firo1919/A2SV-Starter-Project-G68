'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useCreateUserMutation } from '@/lib/redux/api/adminApiSlice'
import { toast } from 'react-toastify'
import { CreateUser, userSchema } from '@/lib/zod/admin/CreateUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImSpinner } from 'react-icons/im'
import { useRouter } from 'next/navigation'

const CreateNewUserForm = () => {
    const [createUser, {isLoading, error}] = useCreateUserMutation();
    const form = useForm<CreateUser>({ resolver: zodResolver(userSchema) });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
  const router = useRouter()

  async function submitFunc (data: CreateUser) {
    try {
        const result = await createUser(data).unwrap();

        toast.success("User created successfully!", {
            draggable: false,
            theme: "colored",
            hideProgressBar: true,
    });
    router.push('/admin/users')
    reset();
    } catch (error) {
        toast.error("User creation failed", {
            draggable: false,
            theme: "colored",
            hideProgressBar: true,
        });
        console.error(error);
        }        
    }
  


  return (
    <div className='w-full flex flex-col items-center mb-16 md:mb-30'>
        <form className='flex flex-col p-4 w-full' onSubmit={handleSubmit(submitFunc)} noValidate>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full bg-white gap-2 p-6  rounded-t-2xl'>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="full_name">Full name</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='full_name' {...register("full_name", {required: "please enter cycle name"})}/>
                    <p className= 'text-red-600'>{errors.full_name?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="email">Email address</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="email" id='email' {...register("email", {required: "please enter your email_address"})}/>
                    <p className= 'text-red-600'>{errors.email?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="password">Password</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="password" id='password' placeholder='Set an initial password' {...register("password", {required: "please enter the start date"})}/>
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
        
            <div className='bg-[#F9FAFB] flex justify-end p-4 gap-6 w-full rounded-b-2xl  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.09)]'>
                <button className='bg-white text-[#111111] border-[#D1D5DB] border-1 rounded py-2 px-4'>Cancel</button>
                <button type='submit' className='text-white bg-[#4F46E5] rounded py-2 px-4'>Save User</button>
            </div>
        </form>
        {isLoading && (
            <div className="absolute top-0 w-full h-full bg-athens-gray opacity-50 flex items-center justify-center">
                <ImSpinner className="text-7xl animate-spin" />
            </div>
        )}
    </div>
  )
}

export default CreateNewUserForm