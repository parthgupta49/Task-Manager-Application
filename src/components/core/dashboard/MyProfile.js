import React from 'react'
import { useSelector } from 'react-redux'
import MyProfileSection from './profile/MyProfileSection';

const MyProfile = () => {

    const { user } = useSelector((store) => store.profile);
    const userDateOfBirth = new Date(user?.additionalDetails?.dateOfBirth).toDateString();
    console.log(userDateOfBirth);
    return (
        <div className='text-white flex flex-col gap-5'>
            <h1 className='text-3xl font-medium -ml-12'>My Profile</h1>
            {/* section-1 */}
            <MyProfileSection customClasses='items-center'>
                <div className='flex gap-x-10  items-center'>
                    <img src={user?.image} alt={`profile-${user?.firstname}`} className='aspect-square w-[4rem]  rounded-full object-cover' />
                    <div className='flex flex-col'>
                        <p className="font-medium text-lg">{user?.firstname + " " + user?.lastname}</p>
                        <p className="opacity-60 text-sm">{user?.email}</p>
                    </div>
                </div>
            </MyProfileSection>

            {/* section-2 */}
            <MyProfileSection customClasses='items-center'>
                <div className='flex flex-col '>
                    <h2 className='text-lg font-medium'>About</h2>
                    <p className='opacity-60'>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
                </div>
            </MyProfileSection>

            {/* section-3 */}
            <MyProfileSection customClasses=''>
                <div className='w-full flex flex-col gap-8'>
                    <h2 className='font-medium text-xl'>Personal Details</h2>
                    <div className='flex gap-x-32'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className=' text-richblack-500'>First Name</p>
                                <p>{user?.firstname}</p>
                            </div>

                            <div className=''>
                                <p className=' text-richblack-500'>Email</p>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <p className=' text-richblack-500'>Gender</p>
                                <p>{user?.additionalDetails?.gender ?? "Edit Gender Details" }</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className=' text-richblack-500'>Last Name</p>
                                <p>{user?.lastname}</p>
                            </div>
                            <div>
                                <p className=' text-richblack-500'>Date Of Birth</p>
                                <p>{userDateOfBirth ?? "Please Input your Date Of Birth"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MyProfileSection>
        </div>
    )
}

export default MyProfile