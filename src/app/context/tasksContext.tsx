"use client"

import { createContext } from "react";
import {TasksContextType} from "../types/tasksContextType"


const TasksContext = createContext<TasksContextType>({
    tasks: [],
    setTasks: () => {},
    completed: false, 
    setCompleted: () => {},
    titleTask: "", 
    setTitleTask: () => {},
    isPopupAddOpen: false, 
    setIsPopupAddOpen: () => {},
    search: "",
    setSearch: () => {},
    filteredTasks: [],
    setFilteredTasks: () => {},
    taskToUpdate:  null,
    setTaskToUpdate: () => {},
})

export default TasksContext