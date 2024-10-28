import React from 'react'
import ViewTask from './ViewTask'
import AddTaskForm from './forms/AddTaskForm'
import EditTaskForm from './forms/EditTaskForm'
import ViewTaskForm from './forms/ViewTaskForm'

const TaskModal = ({ modalData }) => {
    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center z-50 bg-richblack-700 backdrop-blur-sm bg-opacity-50'> {/* Added overlay */}
                <div className='bg-richblack-800 py-5 px-6 rounded-md text-richblack-300 border border-richblack-300'>
                {
                    modalData?.type === 'addTask' && <AddTaskForm/> || modalData?.type === 'editTask' && <EditTaskForm/> || modalData?.type === 'viewTask' && <ViewTaskForm/>

                }
                </div>
            </div>
        </>
    )
}

export default TaskModal