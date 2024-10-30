
import { tasksEndpoints } from "../apis";
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { setLoading, setTasks } from "../../slices/taskSlice";
import { useNavigate } from "react-router-dom";
import CheckForTokenExpiration from "../../utils/checkForTokenExpiration";
const { GET_ALL_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } = tasksEndpoints
export function getAllTasks(navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_ALL_TASKS, null, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data?.message)
            }
            dispatch(setTasks(response?.data?.user?.tasks))
            localStorage.setItem('tasks', JSON.stringify(response?.data?.user?.tasks));
            toast.success(response?.data?.message);
        } catch (error) {
            console.log("FETCH ALL TASKS ERROR", error.response);
            toast.error(error.response.data.message);
            CheckForTokenExpiration(error.response.data.message, null, navigate);
        }
        dispatch(setLoading(false));
    }
}
export function addTask(title, description, category, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", ADD_TASK, { title, description, category }, null, null, true);
            console.log(response?.data);
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setTasks(response?.data?.updatedUser?.tasks))
            localStorage.setItem('tasks', JSON.stringify(response?.data?.updatedUser?.tasks));
            toast.success(response?.data?.message);
        } catch (error) {
            console.log("ADD TASK ERROR", error.response);
            CheckForTokenExpiration(error.response.data.message, toastId, navigate);
        }
        dispatch(setLoading(false));
        
    }
}

export function editTask(taskId,newTitle, newDescription, newCategory,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", EDIT_TASK, { taskId,newTitle, newDescription, newCategory }, null, null, true);
            console.log("EDIT TASK API RESPONSE : ",response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setTasks(response?.data?.updatedUser?.tasks))
            localStorage.setItem('tasks', JSON.stringify(response?.data?.updatedUser?.tasks));
            toast.success(response?.data?.message);
        } catch (error) {
            console.log("EDIT TASK ERROR", error.response);
            toast.error(error.response.data.message);
            CheckForTokenExpiration(error.response.data.message, toastId,navigate);
        }
        dispatch(setLoading(false));
        if(toastId){toast.dismiss(toastId);}
    }
}
export function deleteTask(taskId,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", DELETE_TASK, { taskId }, null, null, true);
            console.log(response?.data);
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            dispatch(setTasks(response?.data?.updatedUser?.tasks))
            localStorage.setItem('tasks', JSON.stringify(response?.data?.updatedUser?.tasks));
            toast.success(response?.data?.message);
        } catch (error) {
            console.log("DELETE TASK ERROR", error?.response);
            toast.error(error?.response?.data?.message);
            CheckForTokenExpiration(error?.response?.data?.message, toastId,navigate);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
