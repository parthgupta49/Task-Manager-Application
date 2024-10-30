import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TaskCard from "./TaskCard";
import AddTask from "./tasks/AddTask";
import { getAllTasks } from "../../../services/operations/taskAPI";
import { useNavigate } from "react-router-dom";
import { setTasks } from "../../../slices/taskSlice";
export default function MyTasks() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, loader } = useSelector(store => store.tasks);
    const [todoList, setTodoList] = useState(tasks?.filter(task => task?.category?.name === 'todo'));
    const [inProgressList, setInProgressList] = useState(tasks?.filter(task => task?.category?.name === 'in-progress'));
    const [tasksDoneList, setTasksDoneList] = useState(tasks?.filter(task => task?.category?.name === 'done'));

    useEffect(() => {
        // Fetch tasks when the component mounts
        dispatch(getAllTasks(navigate));
    }, [dispatch, navigate]);

    useEffect(() => {
        if (tasks) {
            setTodoList(tasks.filter(task => task?.category?.name === 'todo'));
            setInProgressList(tasks.filter(task => task?.category?.name === 'in-progress'));
            setTasksDoneList(tasks.filter(task => task?.category?.name === 'done'));
        }
    }, [tasks]); // Run whenever tasks change


    if (loader) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <AddTask />
            <h1 className="text-richblack-100 text-3xl font-medium text-center">My Tasks</h1>
            <div className="flex w-full gap-4 pt-10">
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
                    <div>
                        {
                            inProgressList?.map((task, index) => (
                                <TaskCard key={index} task={task} />
                            ))

                        }
                    </div>
                </div>
                {/* done */}
                <div className="w-[60%] h-[30rem] border-2 border-richblack-200 bg-white">
                    {/* name of the category */}
                    <div>Done</div>
                    {/* tasks */}
                    <div>
                        {
                            tasksDoneList?.map((task, index) => (
                                <TaskCard key={index} task={task} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}