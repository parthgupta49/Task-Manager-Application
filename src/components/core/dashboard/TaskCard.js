import React from 'react'
import MenuButtons from './tasks/MenuButtons';

const TaskCard = ({ task }) => {
    const createdAt = new Date(task?.createdAt).toLocaleString();
    return (
        <div className='flex flex-col gap-4 bg-richblue-100'>
            <div>
                <p className='text-lg font-semibold'>{task?.title}</p>
                <p>{task?.description}</p>
            </div>

            <div>
                <p>Created At : {createdAt}</p>
            </div>
            <div>
                <MenuButtons task = {task}/>
            </div>
        </div>
    )
}

export default TaskCard