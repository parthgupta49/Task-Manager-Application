import React, { useState } from 'react';
import TaskModal from './TaskModal';
import MyCustomMenuBTN from './MyCustomMenuBTN';

const ViewTask = ({task}) => {
    const [modalData, setModalData] = useState(null);

    const addTaskBTNHandler = () => {
        setModalData({
            type: "viewTask",
            task : task
        });
    };

    const closeModal = () => {
        setModalData(null); // Reset modalData to close the modal
    };

    return (
        <>
            <div onClick={addTaskBTNHandler}>
                <MyCustomMenuBTN text={"View"} customCSS={"bg-green-400 text-richblack-25"} />
            </div>
            
            {modalData && <TaskModal modalData={modalData} onClose={closeModal} />}
        </>
    );
};

export default ViewTask;