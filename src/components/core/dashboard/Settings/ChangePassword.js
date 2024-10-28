import React, { useState } from 'react'
import EditSectionSkeleton from '../profile/MyProfileSection'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSave } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri";
import { FORM_INPUT_STYLING } from '../../../../utils/constants';
import { updatePassword } from '../../../../services/operations/profileAPI';
import toast from 'react-hot-toast';
import IconBTN from '../../../common/IconBTN';



const ChangePassword = () => {
  // const {token} = useSelector(store=>store.auth);
  const dispatch = useDispatch()
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  })

  const formSubmitHandler = (formData) => {
    console.log("FOrm data is : ",formData)

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords Doesnot match");
      return;
    }

    dispatch(updatePassword(formData.oldPassword, formData.newPassword, formData.confirmNewPassword));
  }
  return (
    <div>
      <EditSectionSkeleton iconToBeVisible={false} customClasses='flex-col'>
        <h2 className="text-lg font-medium mb-4">Update Password</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(formSubmitHandler)}>
          <div className='flex flex-col w-fit'>
            <label className='flex flex-col relative'>
              <p>Current Password <sup className="text-pink-200">*</sup></p>
              <div className='relative'>
                <input type={showOldPassword ? 'text' : 'password'} className={`${FORM_INPUT_STYLING} outline-none`} id='currentPassword' {...register("oldPassword", { required: "This is required" })} />
                <span className=' cursor-pointer absolute right-2  translate-y-[50%] duration-200 transition-all' onClick={() => setShowOldPassword(!showOldPassword)}>
                  {
                    showOldPassword ? (<AiOutlineEyeInvisible size={"1.2rem"} />) : (<AiOutlineEye size={"1.2rem"} />)
                  }
                </span>
              </div>
              <span className='text-pink-100'>{errors?.oldPassword?.message}</span>
            </label>
          </div>
          <div className='flex flex-col w-fit'>
            <label className='flex flex-col relative'>
              <p>New Password <sup className="text-pink-200">*</sup></p>
              <div className='relative'>
                <input type={showNewPassword ? 'text' : 'password'} className={`${FORM_INPUT_STYLING} outline-none`}  {...register("newPassword", { required: "This is required" })} />
                <span className=' cursor-pointer absolute right-2  translate-y-[50%] duration-200 transition-all' onClick={() => setShowNewPassword(!showNewPassword)}>
                  {
                    showNewPassword ? (<AiOutlineEyeInvisible size={"1.2rem"} />) : (<AiOutlineEye size={"1.2rem"} />)
                  }
                </span>
              </div>
              <span className='text-pink-100'>{errors?.newPassword?.message}</span>
            </label>
          </div>
          <div className='flex flex-col w-fit'>
            <label className='flex flex-col relative'>
              <p>Confirm New Password <sup className="text-pink-200">*</sup></p>
              <div className='relative'>
                <input type={showConfirmPassword ? 'text' : 'password'} className={`${FORM_INPUT_STYLING} outline-none`}  {...register("confirmNewPassword", { required: "This is required" })} />
                <span className=' cursor-pointer absolute right-2  translate-y-[50%] duration-200 transition-all' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {
                    showConfirmPassword ? (<AiOutlineEyeInvisible size={"1.2rem"} />) : (<AiOutlineEye size={"1.2rem"} />)
                  }
                </span>
              </div>
              <span className='text-pink-100'>{errors?.confirmNewPassword?.message}</span>
            </label>
          </div>



          <IconBTN type='submit' text='Update My Password' customClasses={"w-fit flex flex-row-reverse items-center gap-x-2 bg-pink-300 px-2 py-1 rounded-md font-medium"}><RiLockPasswordLine size={"1.2rem"} /></IconBTN>
        </form>
      </EditSectionSkeleton> 
    </div>
  )
}

export default ChangePassword