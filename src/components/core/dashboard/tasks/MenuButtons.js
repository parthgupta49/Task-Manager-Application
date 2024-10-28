import React from 'react'
import DeleteTask from './DeleteTask'
import EditTask from './EditTask'
import ViewTask from './ViewTask'

const MenuButtons = ({task}) => {
  return (
    <div className='flex gap-3'>
        <DeleteTask task = {task}/>
        <EditTask   task = {task}/>
        <ViewTask   task = {task}/>
    </div>
  )
}

export default MenuButtons