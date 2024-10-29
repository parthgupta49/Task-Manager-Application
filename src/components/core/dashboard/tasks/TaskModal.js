import React, { useEffect, useRef } from 'react';
import useOutsideClick from './useOutsideClick'; // Import the custom hook
import AddTaskForm from './forms/AddTaskForm';
import EditTaskForm from './forms/EditTaskForm';
import ViewTaskForm from './forms/ViewTaskForm';
import { AiFillCloseCircle } from "react-icons/ai";
const TaskModal = ({ modalData, onClose }) => {
    const modalRef = useRef(null);
    // Use the custom hook to close the modal when clicking outside
    useOutsideClick(modalRef, onClose);
    const closeModal = () => {
        onClose();
    }
    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-richblack-700 backdrop-blur-sm bg-opacity-50'>
                <div ref={modalRef} className='relative bg-richblack-800 py-5 px-6 rounded-md text-richblack-300 border border-richblack-300'>
                    <div onClick={closeModal} className='cursor-pointer absolute right-[3%] top-[3%] '><AiFillCloseCircle size={"2rem"} /></div>
                    {modalData?.type === 'addTask' && <AddTaskForm onClose = {onClose} />}
                    {modalData?.type === 'editTask' && <EditTaskForm onClose={onClose} task = {modalData?.task} />}
                    {modalData?.type === 'viewTask' && <ViewTaskForm onClose={onClose} task = {modalData?.task} />}
                </div>
            </div>
        </>
    );
};

export default TaskModal;