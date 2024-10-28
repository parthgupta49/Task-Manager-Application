import React, { useEffect, useState } from 'react'
import EditSectionSkeleton from '../profile/MyProfileSection'
import { useForm } from 'react-hook-form'
import Button from '../../../core/Homepage/Button';
import { FORM_INPUT_STYLING } from '../../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { editMyProfile } from '../../../../services/operations/profileAPI';
import IconBTN from '../../../common/IconBTN';
import { CgProfile } from "react-icons/cg";
import toast from 'react-hot-toast';

const UpdateProfile = () => {
  
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with zero
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (1-31) and pad with zero
  
    return `${year}-${month}-${day}`; // Return formatted date
  }

  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.profile)
  const {additionalDetails} = user;
  const myDOB = new Date(additionalDetails?.dateOfBirth)
  const aboutLength = additionalDetails?.about.length;
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    defaultValues: {
      dateOfBirth: `${additionalDetails?.dateOfBirth ?  formatDateToYYYYMMDD(myDOB) : ""}`,
      about: `${additionalDetails?.about ? additionalDetails?.about : ""}`,
      gender:`${additionalDetails?.gender ? additionalDetails?.gender : "Male"}`,
    }
  })

  const onSubmit = (data) => {
    console.table([data?.dateOfBirth, data?.about, data?.gender]);
    if (  !data?.about || !data?.dateOfBirth){
      toast.error("Please input all the fields");
      return;
    }
    dispatch(editMyProfile(data?.dateOfBirth, data?.about, data?.gender, data?.countryCode + data?.contactNumber));
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
        reset({
          dateOfBirth: "",
          about: "",
          gender: "",
        })
    }
  }, [reset, isSubmitSuccessful])



  return (
    <EditSectionSkeleton iconToBeVisible={false} customClasses='flex-col'>
      <h2 className='text-xl font-medium'>Profile Information</h2>
      <form className='w-full flex flex-col gap-4 mt-10' onSubmit={handleSubmit(onSubmit)}>

        {/* date of birth */}
        <div className='flex justify-between w-full '>
          <label className='flex flex-col text-richblack-100 w-[48%]'>
            <p>Date of Birth</p>
            <input type='date'  {...register("dateOfBirth", { required: true, })} className='outline-none placeholder:text-richblack-200 placeholder:font-semibold rounded-lg p-3 bg-richblack-700 text-white' />
          </label>
          <label className=' text-richblack-100 w-[48%]'>
            <p>Gender<span className='text-pink-200'>*</span></p>
            <div className={`${FORM_INPUT_STYLING} h-[65%] shadow-md flex justify-evenly gap-x-4 items-center pr-14`}>
              <label className='flex gap-3'>
                <input type='radio' value={"Male"} {...register("gender", { required: true })} placeholder='Enter last name' className=' placeholder:text-richblack-200 placeholder:font-semibold rounded-lg p-3 bg-richblack-700 text-white' />
                <span className='text-lg font-medium'>Male</span>
              </label>
              <label className='flex gap-3'>
                <input type='radio' value={"Female"} {...register("gender", { required: true })} placeholder='Enter last name' className=' placeholder:text-richblack-200 placeholder:font-semibold rounded-lg p-3 bg-richblack-700 text-white' />
                <span className='text-lg font-medium'>Female</span>
              </label>
              <label className='flex gap-3'>
                <input type='radio' value={"Other"} {...register("gender", { required: true })} placeholder='Enter last name' className=' placeholder:text-richblack-200 placeholder:font-semibold rounded-lg p-3 bg-richblack-700 text-white' />
                <span className='text-lg font-medium'>Other</span>
              </label>
            </div>
          </label>
        </div>

        <div className='flex justify-between'>
          {/* message */}
          <label className='flex flex-col text-richblack-100 w-[48%]'>
            <p>About</p>
            <textarea
              rows={`${aboutLength && aboutLength < 120 ? 2 : 5 }`}
              {...register("about", { required: true })} placeholder='Enter Bio Details' className=' overflow-hidden outline-none placeholder:text-richblack-200 placeholder:font-semibold rounded-lg p-3 bg-richblack-700 text-white' />
          </label>
        </div>

        <IconBTN type='submit' text='Save My Profile' customClasses={"w-fit flex flex-row-reverse items-center gap-x-2 bg-pink-300 px-2 py-1 rounded-md font-medium"}><CgProfile size={"1.2rem"} /></IconBTN>

      </form>

    </EditSectionSkeleton>
  )
}

export default UpdateProfile