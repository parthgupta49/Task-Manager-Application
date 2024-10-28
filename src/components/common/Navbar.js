import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI'
import ConfirmModal from './ConfirmModal';
import Profile from './Profile'
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.profile);
    const matchRoute = (route) => {
        return matchPath(route, location.pathname)
    }

    const [modalData, setModalData] = useState(null);

    function logoutBTNHandler() {
        setModalData({
            text1: 'Are you Sure',
            text2: 'You will be logged out of your account',
            btn1Text: "Yes",
            btn1Handler: () => {
                dispatch(logout(navigate));
                setModalData(null);
            },
            btn2Text: "No",
            btn2Handler: () => setModalData(null)
        })
    }

    console.log("user is ", user);
    // console.log("token is ", token);

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-black bg-gray-500'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between '>
                {/* logo */}
                <div className='text-richblack-25 text-lg font-medium'>
                    LOGO_MAIN_APPLICATION
                </div>
                {/* buttons */}
                <div>
                    {
                        user ? <div className='flex gap-4 items-center'><Profile/><button className={`rounded-lg border p-2 px-3 text-richblack-50 "} `}
                            onClick={logoutBTNHandler}
                        >Logout</button></div> :
                            <div className='flex gap-4 items-center text-richblack-50' >
                                <Link to="/login"><button
                                    className={`rounded-lg border p-2 px-3 ${matchRoute("/login") && "bg-richblue-400"}`}
                                >Log in</button></Link>
                                <Link to="/signup"><button className={`rounded-lg border p-2 px-3 ${matchRoute("/signup") && "bg-richblue-400"}`}
                                >Sign up</button></Link>
                            </div>
                    }
                </div>
            </div>
            {/* modal */}
            {
                modalData && <ConfirmModal modalData={modalData} />
            }
        </div>
    )
}

export default Navbar