import React, { useState } from 'react'
import Button from '../../Homepage/Button'
import TaskModal from './TaskModal';

const AddTask = () => {

    const [modalData, setModalData] = useState(null);

    function addTaskBTNHandler() {
        setModalData({
            type : "addTask",

        })
    }
    return (
        <>
            <div onClick={addTaskBTNHandler}>
                <Button active={true} customClasses="w-fit"><span>Add Task</span></Button>
            </div>
            
            {modalData && <TaskModal modalData = {modalData}/>}
        </>
    )
}

export default AddTask