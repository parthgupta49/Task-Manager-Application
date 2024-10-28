import React from 'react'
import IconBTN from './IconBTN'
/*
    things in modal i should implement : 
    blur the background
    text1 : Are you sure
    text2 : You will be logged out of your account
    btn1 : Logout , have to define clickHandler, 
    btn2 : Cancel , define clickHandler => here we have to close the modal

*/

const ConfirmModal = ({ modalData }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-richblack-700 backdrop-blur-sm bg-opacity-50'> {/* Added overlay */}
            <div className='bg-richblack-800 py-5 px-6 rounded-md text-richblack-300 border border-richblack-300'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-3 pb-2'>
                        <p className='text-xl font-bold text-richblack-25'>{modalData.text1}</p>
                        <p className='text-sm opacity-90'>{modalData.text2}</p>
                    </div>
                    <div className='flex gap-x-3'>
                        <IconBTN
                            onclick={modalData.btn1Handler}
                            text={modalData.btn1Text}
                            customClasses={`px-2 py-1  rounded-md bg-yellow-25 text-richblack-900 font-medium ${modalData?.btn1CustomCSS}`}
                        />
                        <button
                            onClick={modalData.btn2Handler}
                            className={`px-2 py-1  rounded-md bg-richblack-100 text-richblack-900 font-medium ${modalData?.btn2CustomCSS}`}
                        >
                            {modalData.btn2Text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal