import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { googleLogIn, login } from "../../../services/operations/authAPI"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"

const firebaseConfig = {
    apiKey: "AIzaSyBP8CDB8GSlsrWzdh4v7v3Yg0mliOnOKvk", 
    authDomain: "todo-web-application-1e5e8.firebaseapp.com",
    projectId: "todo-web-application-1e5e8",
    storageBucket: "todo-web-application-1e5e8.appspot.com",
    messagingSenderId: "91785028349",
    appId: "1:91785028349:web:4bd691d0870781db9cd494"
};

//initialising
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const { email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }

    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then((result)=>{
            //habdle the data
            // var username = result.user.displayName;
            const email = result.user.email;
            dispatch(googleLogIn(email,navigate));
        })
        .catch((error)=>{
            console.log('error in logging in',error);
            toast.error("Error while logging In With Google");
        })
    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
            </label>
            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                <Link to="/forgotpassword">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Log In
            </button>
            <span className="text-richblack-50 text-sm text-center">or login with</span>
            <button
                    type = "button"
                    onClick = {handleGoogleSignup}
                    className= "mt-2 rounded-[8px] bg-richblack-25 py-[8px] px-[12px] font-medium text-white flex justify-center items-center"
                >
                    <span className=""><FcGoogle size={"1.7rem"}/></span>
                </button>
        </form>
    )
}

export default LoginForm