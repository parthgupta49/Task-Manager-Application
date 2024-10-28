import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/core/dashboard/SideBar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((store) => store.auth);
    const { loading: profileLoading } = useSelector((store) => store.profile);
    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <SideBar />
            {/* <div className='absolute left-[15%] text-white w-full'>Home / </div> */}
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full ' >
                <div className=' w-11/12 max-w-[1300px] py-10 px-[5rem]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard