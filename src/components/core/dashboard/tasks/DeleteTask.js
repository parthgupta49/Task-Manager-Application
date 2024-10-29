import React, { useState } from 'react'
import ConfirmModal from '../../../common/ConfirmModal';
import { deleteTask } from '../../../../services/operations/taskAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyCustomMenuBTN from './MyCustomMenuBTN';
const DeleteTask = ({ task }) => {
    const [modalData, setModalData] = useState(null);
    console.log(task.title.length)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleDelete() {
        setModalData({
            text1: "Are you sure?",
            text2: `You want to delete ${task?.title?.length > 15 ? task?.title?.substring(0,10) + "..." :  task?.title} task from the list?`,
            btn1Text: "Yes,Delete",
            btn1Handler: () => {
                // delete task
                dispatch(deleteTask(task?._id,navigate));
                setModalData(null);
            },
            btn2Text: "No,Cancel",
            btn2Handler: () => {
                setModalData(null);
            },
            btn1CustomCSS : "",
            btn2CustomCSS : ""

        })
    }
    return (
        <>
            <div onClick={handleDelete}>
            <MyCustomMenuBTN text = {"Delete"} customCSS = {"outline-none bg-red-400 text-richblack-25"} />
            </div>
            {modalData && (<ConfirmModal modalData={modalData} />)}
        </>
    )
}

export default DeleteTask