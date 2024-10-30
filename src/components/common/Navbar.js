import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/authAPI'
import ConfirmModal from './ConfirmModal';
import Profile from './Profile';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBP8CDB8GSlsrWzdh4v7v3Yg0mliOnOKvk",
    authDomain: "todo-web-application-1e5e8.firebaseapp.com",
    projectId: "todo-web-application-1e5e8",
    storageBucket: "todo-web-application-1e5e8.appspot.com",
    messagingSenderId: "91785028349",
    appId: "1:91785028349:web:4bd691d0870781db9cd494"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        signOut(auth)
                            .then(() => {
                                console.log('signed out :)');
                                dispatch(logout(navigate));
                                setModalData(null);
                            })
                    }
                    else {
                        dispatch(logout(navigate));
                        setModalData(null);
                    }
                });

            },
            btn2Text: "No",
            btn2Handler: () => setModalData(null)
        })
    }
    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-richblue-600 bg-richblack-700'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between '>
                {/* logo */}
                <Link to={"/"}><div className='text-richblack-25 text-2xl font-semibold font-mono '>
                    MANAGE YOUR TASKS
                </div></Link>
                {/* buttons */}
                <div>
                    {
                        user ? <div className='flex gap-4 items-center'><Profile /><button className={`rounded-lg border p-2 px-3 text-richblack-50 "} `}
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