import React, { useState } from 'react';
import Button from '../../Homepage/Button';
import TaskModal from './TaskModal';

const AddTask = () => {
    const [modalData, setModalData] = useState(null);

    const addTaskBTNHandler = () => {
        setModalData({
            type: "addTask",
        });
    };

    const closeModal = () => {
        setModalData(null); // Reset modalData to close the modal
    };

    return (
        <>
            <div onClick={addTaskBTNHandler}>
                <Button active={true} customClasses="w-fit"><span>Add Task</span></Button>
            </div>
            
            {modalData && <TaskModal modalData={modalData} onClose={closeModal} />}
        </>
    );
};

export default AddTask;