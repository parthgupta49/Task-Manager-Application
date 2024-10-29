import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editTask } from "../../../../../services/operations/taskAPI";
import { useNavigate } from "react-router-dom";
const categories = ['todo','in-progress','done'];
const EditTaskForm = ({ task }) => {
   const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: task.title || '',
        description: task.description || '',
        category: task.category?.name || '', // Extracting the name from the category object
    });
    const dispatch = useDispatch();
    const { title, description, category } = formData;

    // Handle input fields when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // Call the onSubmit function passed as a prop
        console.log(formData);
        dispatch(editTask(task._id,formData.title,formData.description,formData.category,navigate));
        // onSubmit({ ...formData, category });
        // toast.success("Task updated successfully!");
    };

    return (
        <div>
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Title <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleOnChange}
                        placeholder="Enter task title"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Description <sup className="text-pink-200">*</sup>
                    </p>
                    <textarea
                        required
                        name="description"
                        value={description}
                        onChange={handleOnChange}
                        placeholder="Enter task description"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Category <sup className="text-pink-200">*</sup>
                    </p>
                    <select
                        required
                        name="category"
                        value={category}
                        onChange={handleOnChange}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default EditTaskForm;