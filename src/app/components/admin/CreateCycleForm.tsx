'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools"

type FormTypes = {
    cycle_name: string,
    country: string,
    start_date: string,
    end_date: string
}

const CreateCycleForm = () => {
    const form = useForm<FormTypes>({
        defaultValues: {
            cycle_name: "",
            country: "",
            start_date: "",
            end_date: ""
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
                    <label className='bg-white font-medium' htmlFor="cycle_name">cycle name</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='cycle_name' {...register("cycle_name", {required: "please enter cycle name"})}/>
                    <p className= 'text-red-600'>{errors.cycle_name?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="country">country</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='country' {...register("country", {required: "please enter your country"})}/>
                    <p className= 'text-red-600'>{errors.country?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="start_date">start date</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='start_date' {...register("start_date", {required: "please enter the start date"})}/>
                    <p className= 'text-red-600'>{errors.start_date?.message}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='bg-white font-medium' htmlFor="end_date">end date</label>
                    <input className='bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] w-full rounded-2xl py-1' type="text" id='end_date' {...register("end_date", {required: "please enter the end date"})}/>
                    <p className= 'text-red-600'>{errors.end_date?.message}</p>
                </div>
            </div>
        
            <div className='bg-[#F9FAFB] flex justify-end p-2 gap-6'>
                <button className='bg-white text-[#111111] border-[#D1D5DB] border-1 rounded py-2 px-4'>Cancel</button>
                <button className='text-white bg-[#4F46E5] rounded py-2 px-4'>Save Cycle</button>
            </div>
        </form>
        <DevTool control={control}/>
    </div>
  )
}

export default CreateCycleForm