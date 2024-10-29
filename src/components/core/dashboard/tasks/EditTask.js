import React, { useState } from 'react';
import TaskModal from './TaskModal';
import MyCustomMenuBTN from './MyCustomMenuBTN';

const EditTask = ({task}) => {
    const [modalData, setModalData] = useState(null);

    const addTaskBTNHandler = () => {
        setModalData({
            type: "editTask",
            task : task
        });
    };

    const closeModal = () => {
        setModalData(null); // Reset modalData to close the modal
    };

    return (
        <>
            <div onClick={addTaskBTNHandler}>
                <MyCustomMenuBTN text={"Edit"} customCSS={"bg-pink-300 text-white"} />
            </div>
            
            {modalData && <TaskModal modalData={modalData} onClose={closeModal} />}
        </>
    );
};

export default EditTask;