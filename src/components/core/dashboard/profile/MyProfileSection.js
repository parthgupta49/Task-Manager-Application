import React from 'react'
import IconBTN from '../../../common/IconBTN'
import { FaRegEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const MyProfileSection = ({children,customClasses = '',iconToBeVisible = true}) => {
    const navigate = useNavigate();
    return (
        <div className={`flex justify-between w-full relative  bg-richblack-800 px-6 py-5 rounded-lg border border-richblack-600 ${customClasses}`}>
            {children}
            <IconBTN customClasses={`w-fit h-fit px-4 py-2 text-sm font-medium rounded-md bg-yellow-100 text-richblack-800  items-center  gap-x-1 flex-row-reverse ${iconToBeVisible ? "flex" : "hidden"}`} text={"Edit"} onclick={() => { navigate("/dashboard/settings") }}>
                <FaRegEdit className="text-lg" />
            </IconBTN>
        </div>
    )
}

export default MyProfileSection