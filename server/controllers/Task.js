const Task = require('../models/Tasks');
const User = require('../models/User');
const Category = require('../models/Category');
const mongoose = require('mongoose');

exports.addTask = async (req, res) => {
    try {
        // get the details for the task from req.body
        const { title, description, category } = req.body
        const userId = req.user.id;

        if (!title || !description || !category) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }
        // find the category with this name
        const categoryDetails = await Category.findOne({ name: category });
        if (!categoryDetails) {
            return res.status(404).json({ success: false, message: "Can't find the category to update the task" })
        }
        console.log(categoryDetails);
        // now the category is indeed the correct one
        // create the task
        const task = await Task.create({
            title: title,
            description: description,
            category: categoryDetails._id,
            user: userId
        });
        console.log(task);
        // update the user with the task as well
        const user = await User.findByIdAndUpdate(userId, { $push: { tasks: task._id } }, { new: true }).populate({
            path: 'tasks',
            populate : {
                path : 'category'
            }
        });

        if (!task) {
            return res.status(400).json({ success: false, message: "Couldn't create the task" });
        }
        // now the task is created, add this task in the category
        const updatedCategory = await Category.findByIdAndUpdate(categoryDetails._id, { $push: { tasks: task } }, { new: true }).populate("tasks");
        if (!updatedCategory) {
            return res.status(400).json({ success: false, message: "Couldn't update the category with the task" });
        }
        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            updatedUser: user,
            task: task,
            category: updatedCategory
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error while creating the task"
        })

    }

}

exports.editTask = async (req, res) => {
    try {
        const userId = req?.user?.id;
        // fetch the details
        const { newTitle, newDescription, newCategory } = req.body;
        const taskId = new mongoose.Types.ObjectId(req.body?.taskId);
        console.log(taskId);
        // check if all the fields are present
        if (!taskId || !newTitle || !newDescription || !newCategory) {
            return res.status(400).json({
                success: false, message: "Please fill all the fields"
            });
        }

        const oldTaskDetails = await Task.findById(taskId);
        if (!oldTaskDetails) {
            return res.status(400).json({
                success: false, message: "Task not found to update"
            });
        }
        const oldTaskCategoryTemp = oldTaskDetails?.category;
        let newTaskCategory;
        console.log("BACKEND checking whether the task category is the same, ",oldTaskDetails.category !== newCategory)
        if (oldTaskDetails.category !== newCategory) {
            // then only i have to update the categories
            const oldTaskCategory = await Category.findByIdAndUpdate({ _id: oldTaskDetails.category }, { $pull: { tasks: taskId } }, { new: true })
            console.log(oldTaskCategory)

            newTaskCategory = await Category.findOneAndUpdate({ name: newCategory }, { $push: { tasks: taskId } }, { new: true })

            //prviously forgot -  i have to update the category of the task as well isn't it
            await Task.findByIdAndUpdate(taskId,{
                category:newTaskCategory._id
            })
        }
        let updatedTask;
        // find the task and update the task
        if (newTitle !== oldTaskDetails?.title || newDescription !== oldTaskDetails?.description){
            updatedTask = await Task.findByIdAndUpdate(taskId, {
                title: newTitle,
                description: newDescription,
            }, { new: true }).populate("user");
        }
        const updatedUserWithTasks = await User.findById(userId).populate({
            path : "tasks",
            populate : {
                path : "category",
            }
        })
        console.log(updatedUserWithTasks?.tasks);

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            updatedTask: updatedTask,
            newTaskCategory: newTaskCategory,
            updatedUser : updatedUserWithTasks
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error while updating the task"
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskId = new mongoose.Types.ObjectId(req.body?.taskId);
        const userId = req.user?.id;
        if (!taskId) {
            return res.status(400).json({
                success: false, message: "Task id is required to delete"
            })
        }
        // find the user and remove this taskId from that 
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId }, }, { new: true }).populate({
            path: 'tasks',
            populate : {
                path : 'category'
            }
        });
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(400).json({
                success: false, message: "Couldn't find the user to delete the task from"
            });
        }
        // find the task and remove it
        const deletedTask = await Task.findById(taskId);
        const categoryId = deletedTask.category;
        // pull this task from the category as well
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { $pull: { tasks: deletedTask._id } }, { new: true });

        if (!updatedCategory) {
            return res.status(400).json({
                success: false, message: "Couldn't remove the task from the category"
            });
        }
        await Task.findByIdAndDelete(deletedTask._id);
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTask: deletedTask,
            updatedUser: updatedUser,
            updatedCategory: updatedCategory
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error while deleting the task"
        })
    }
}
exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({
                success: false, message: "User id is required to get all tasks"
            });
        }
        // get all the tasks of this user 
        const completeUserDetails = await User.findById(userId).populate("additionalDetails").populate({
            path: 'tasks',
            populate: {
                path: 'category' // Populate the category field in each task
            }
        });
        if (!completeUserDetails) {
            return res.status(400).json({
                success: false, message: "unable to fetch all the details"
            });
        }
        // let allTasks = [];
        // for (const object of completeUserDetails?.tasks) {
        //     const populatedCategoryDetails = await Category.findById(object?.category).populate("tasks");
        //     allTasks.push({ ...object, category: populatedCategoryDetails });
        // }
        return res.status(200).json({
            success: true,
            message: "All tasks fetched successfully",
            // allTasks: allTasks,
            user: completeUserDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error while fetching all tasks"
        });

    }
}