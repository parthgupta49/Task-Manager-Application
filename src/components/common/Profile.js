import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {user} = useSelector(store => store.profile);
    const userImage = user?.image;
    const navigate = useNavigate();
  return (
    <div className='cursor-pointer' onClick={()=>navigate("/dashboard/my-profile")}>
        <img src={userImage} className=' lg:w-[2.5rem] lg:h-[2.5rem] rounded-full object-cover bg-cover' />
    </div>
  )
}

export default Profile