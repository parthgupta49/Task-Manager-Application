import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
    tasks: localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [],
    loading : false

}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks : (state,value) => {
            state.tasks = value.payload
        },
        setLoading : (state,value) => {
            state.loading = value.payload
        }
    },
})

export const { setTasks,setLoading} = taskSlice.actions

export default taskSlice.reducer