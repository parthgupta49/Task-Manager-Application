import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllTasks } from "../../../services/operations/taskAPI";
import TaskCard from "./TaskCard";
import IconBTN from "../../common/IconBTN";
import Button from "../Homepage/Button";
import AddTask from "./tasks/AddTask";
export default function MyTasks() {
    // const { tasks } = useSelector((state) => state.profile.user);
    // const [tasks,setTasks] = useState(null);

    const dispatch = useDispatch();
    const { tasks, loader } = useSelector(store => store.tasks);
    const [todoList, setTodoList] = useState(null);
    const [inProgressList, setInProgressList] = useState(null);
    const [tasksDoneList, setTasksDoneList] = useState(null);
    // const [todoList,setTodoList] = useState(null);
    // Fetch tasks when the component mounts
    useEffect(() => {
        getAllTasks();
    }, [dispatch]); // Only run once on mount

    // Update local state whenever tasks change
    useEffect(() => {
        if (tasks) {
            setTodoList(tasks.filter(task => task?.category?.name === 'todo'));
            setInProgressList(tasks.filter(task => task?.category?.name === 'in-progress'));
            setTasksDoneList(tasks.filter(task => task?.category?.name === 'done'));
        }
    }, [tasks]); // Run whenever tasks change
    // const navigate = useNavigate()
    // const [courses, setCourses] = useState([])
    // console.log(tasks);
    if (loader) {
        return <div>Loading...</div>
    }
    return (
        <div>
        <AddTask/>
        <h1 className="text-white">My Tasks</h1>
            <div className="flex w-full gap-4">
                {/* todo */}
                <div className="w-[60%] h-[30rem] border-2 border-richblack-200 bg-white">
                    {/* name of the category */}
                    <div>Todo</div>
                    {/* tasks */}
                    <div className="flex flex-col gap-3">
                        {
                            todoList?.map((task, index) => (
                                <TaskCard key={index} task={task} />
                            ))

                        }
                    </div>
                </div>
                {/* in-progress */}
                <div className="w-[60%] h-[30rem] border-2 border-richblack-200 bg-white">
                    {/* name of the category */}
                    <div>In-Progress</div>
                    {/* tasks */}
                    <div></div>
                </div>
                {/* done */}
                <div className="w-[60%] h-[30rem] border-2 border-richblack-200 bg-white">
                    {/* name of the category */}
                    <div>Done</div>
                    {/* tasks */}
                    <div></div>
                </div>
            </div>
        </div>
    )
}