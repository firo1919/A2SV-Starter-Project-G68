'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools"
import { CreateCycle, cycleSchema } from '@/lib/zod/admin/CreateCycle'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

type FormTypes = {
  name: string
  start_date: Date
  end_date: Date
}

const CreateCycleForm = () => {
    const form = useForm<CreateCycle>({ resolver: zodResolver(cycleSchema) });
    const { register, control, handleSubmit, formState } = form;
    const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
    const [isLoading, setIsLoading] = useState(false);

    function submitFunc (data: CreateCycle) {
        // write submit function here
        setIsLoading(true);
        const cycle = {
            name: data.name,
            start_date: data.start_date,
            end_date: data.end_date,
            redirectTo: "/admin/cycles",
        };

        try {
            
        } catch (error) {
            toast("Cycle creation failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
            console.log(error);
        }
        setIsLoading(false);
        reset();
    }


  return (
    <div className='w-full flex flex-col items-center mb-16 md:mb-30'>
        <form className='flex flex-col p-4 w-full' onSubmit={handleSubmit(submitFunc)} noValidate>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full bg-white gap-2 p-6  rounded-t-2xl'>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="name">cycle name</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='name' {...register("name", {required: "please enter cycle name"})}/>
                    <p className= 'text-red-600'>{errors.name?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="country">country</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='country'/>
                    {/* <p className= 'text-red-600'>{errors.country?.message}</p> */}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="start_date">start date</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="date" id='start_date' {...register("start_date", {required: "please enter the start date"})}/>
                    <p className= 'text-red-600'>{errors.start_date?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="end_date">end date</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="date" id='end_date' {...register("end_date", {required: "please enter the end date"})}/>
                    <p className= 'text-red-600'>{errors.end_date?.message}</p>
                </div>
            </div>
        
            <div className='bg-[#F9FAFB] flex justify-end p-4 gap-6 w-full rounded-b-2xl  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.09)]'>
                <button className='bg-white text-[#111111] border-[#D1D5DB] border-1 rounded py-2 px-4'>Cancel</button>
                <button type='submit' className='text-white bg-[#4F46E5] rounded py-2 px-4'>Save Cycle</button>
            </div>
        </form>
        <DevTool control={control}/>
    </div>
  )
}

export default CreateCycleForm