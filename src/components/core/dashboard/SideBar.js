import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SideBarLink from './SideBarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmModal from '../../common/ConfirmModal';
const SideBar = () => {
    const [confirmModal, setConfirmModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);

    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }
    return (
        <div className={`${confirmModal ? "bg-white " : ""}`}>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                {
                    sidebarLinks.map((link) => {
                        return (<SideBarLink link={link} iconName={link.icon} key={link.id} />)
                    }
                    )
                }
                <div className='mx-auto mt-3 mb-3 h-[1px] w-10/12 bg-richblack-600'>
                </div>


                    <SideBarLink
                        iconName={"VscSettingsGear"}
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                    />
                    <button onClick={() => {
                        setConfirmModal({
                            text1: "Are you sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => {dispatch(logout(navigate));setConfirmModal(null)},
                            btn2Handler: () => setConfirmModal(null)
                        })
                    }}
                        className=' text-richblack-300 px-8 py-2 text-sm font-medium'
                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg' /><span>LogOut</span>
                        </div>
                    </button>

            </div>




            {confirmModal && <ConfirmModal modalData={confirmModal} />}
        </div>
    )
}

export default SideBar