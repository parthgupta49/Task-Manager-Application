import React, { useState } from 'react'
import EditSectionSkeleton from '../profile/MyProfileSection'
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../common/ConfirmModal';

const DeleteAccount = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState(null);


  const handleDeleteModal = () => {

    setModalData({

      text1: "Are you sure ?",
      text2: "You will lose all your account data",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => {
        dispatch(deleteAccount(navigate));
        setModalData(null);
      },
      btn2Handler: () => {
        setModalData(null);
      },
      btn1CustomCSS: "text-white bg-pink-600"

    })



  }



  return (
    <EditSectionSkeleton iconToBeVisible={false} customClasses='bg-pink-900 justify-start'>
      <div className='flex gap-x-5'>
        {/* Delete ICON */}
        <div className='text-pink-200 bg-pink-600 px-3 py-3 rounded-full w-fit h-fit'  >
          <RiDeleteBinLine size={"1.4rem"} />
        </div>
        {/* Delete Content */}
        <div className='w-[80%]'>
          <h2 className='text-white font-medium'>Delete Content</h2>
          <p>Would you like to delete account?</p>
          <p>This account contains tasks. Deleting your account will remove all the tasks associated with it.</p>
          <p className='text-[#D43D63] italic cursor-pointer' onClick={handleDeleteModal}>I want to delete my account.</p>
        </div>
      </div>

      {
        modalData && <ConfirmModal modalData={modalData} />
      }
    </EditSectionSkeleton>
  )
}

export default DeleteAccount