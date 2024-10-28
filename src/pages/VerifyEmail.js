import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate, Link } from 'react-router-dom';

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, signupData } = useSelector(state => state.auth);
    const [otp, setOtp] = useState('');
    console.log("Signupdata in verifyemail", signupData);

    useEffect(() => {
        if (signupData === null) navigate('/signup');
    }, [signupData, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { firstName, email, lastName, password, confirmPassword } = signupData
        dispatch(signUp(firstName, lastName, email, password, confirmPassword, otp, navigate)); // understand the flow over here once... | in authAPI there is signup function - read that | signupData in authSlice - read that
    }
    return (
        <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
            {
                loading ? (<>Loading...</>) : (
                    <div>
                        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
                        <p className='text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input {...props}
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"

                                />}
                            />
                            <button type="submit" className='w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900'>Verify Email</button>
                        </form>
                        <div className='flex justify-between'>
                            <Link to="/login">
                                <p className='text-richblack-5 flex items-center gap-x-2'>Back to Login</p>
                            </Link>
                            <button className='flex items-center text-blue-100 gap-x-2' onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail