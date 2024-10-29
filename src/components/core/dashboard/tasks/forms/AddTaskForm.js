import React from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
import { addTask } from '../../../../../services/operations/taskAPI';
import { useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [category, setCategory] = React.useState('todo')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addTask(title,description,category,navigate));
    setTitle('')
    setDescription('')
    setCategory('todo')
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Title <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Description<sup className="text-pink-200">*</sup>
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full resize-none rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Category <sup className="text-pink-200">*</sup>
        </p>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Add Task
      </button>
    </form>
  )
}

export default AddTaskForm