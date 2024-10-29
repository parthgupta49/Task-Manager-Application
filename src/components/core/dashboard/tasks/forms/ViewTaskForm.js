import React from 'react';

const ViewTaskForm = ({ task }) => {
    return (
        <div className="flex flex-col gap-y-4 p-4 bg-richblack-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-richblack-5">Task Details</h2>
            <div className="flex flex-col gap-y-2">
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Title:
                    </p>
                    <div className="lg:min-w-[20rem] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 min-h-[40px] flex items-center">
                        {task.title || 'No Title Provided'}
                    </div>
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Description:
                    </p>
                    <div className="lg:min-w-[20rem] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 min-h-[40px] flex items-center">
                        {task.description || 'No Description Provided'}
                    </div>
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Category:
                    </p>
                    <div className="lg:min-w-[20rem] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 min-h-[40px] flex items-center">
                        {task.category?.name || 'No Category Provided'}
                    </div>
                </label>
            </div>
        </div>
    );
};

export default ViewTaskForm;