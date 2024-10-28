
import { tasksEndpoints } from "../apis";
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { setLoading, setTasks } from "../../slices/taskSlice";
import { logout } from "./authAPI";
import { useNavigate } from "react-router-dom";
import CheckForTokenExpiration from "../../utils/checkForTokenExpiration";
const { GET_ALL_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } = tasksEndpoints
export function getAllTasks() {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const navigate = useNavigate();
        try {
            const response = await apiConnector("GET", GET_ALL_TASKS, null, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data?.message)
            }
            dispatch(setTasks(response.data?.user?.tasks))
            localStorage.setItem('tasks', JSON.stringify(response.data?.user?.tasks))
        } catch (error) {
            console.log("FETCH ALL TASKS ERROR", error.response);
            toast.error(error.response.data.message);
            CheckForTokenExpiration(error.response.data.message, null, navigate);
        }
        dispatch(setLoading(false));
    }
}
export function addTask(title, description, category) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", ADD_TASK, { title, description, category }, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setTasks(response.data.user.tasks))
            localStorage.setItem('tasks', JSON.stringify(response.data.user.tasks));
        } catch (error) {

            console.log("ADD TASK ERROR", error.response);
            toast.error(error.response.data.message);
            CheckForTokenExpiration(error.response.data.message, toastId);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function editTask(newTitle, newDescription, newCategory) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", EDIT_TASK, { newTitle, newDescription, newCategory }, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setTasks(response.data.user.tasks))
            localStorage.setItem('tasks', JSON.stringify(response.data.user.tasks));
        } catch (error) {
            console.log("EDIT TASK ERROR", error.response);
            toast.error(error.response.data.message);
            CheckForTokenExpiration(error.response.data.message, toastId);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function deleteTask(taskId) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", DELETE_TASK, { taskId }, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setTasks(response.data.user.tasks))
            localStorage.setItem('tasks', JSON.stringify(response.data.user.tasks));
        } catch (error) {
            console.log("DELETE TASK ERROR", error.response);
            toast.error(error.response.data.message);
            CheckForTokenExpiration(error.response.data.message, toastId);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
