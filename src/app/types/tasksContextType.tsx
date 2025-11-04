import { Dispatch, SetStateAction } from "react"
import { TaskType } from "./taskType"

export type TasksContextType = {
    tasks : TaskType[],
    setTasks: Dispatch<SetStateAction<TaskType[]>>,
    completed: boolean,
    setCompleted: Dispatch<SetStateAction<boolean>>,
    titleTask: string, 
    setTitleTask: Dispatch<SetStateAction<string>>,
    isPopupAddOpen: boolean, 
    setIsPopupAddOpen: Dispatch<SetStateAction<boolean>>,
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    filteredTasks:TaskType[],
    setFilteredTasks: Dispatch<SetStateAction<TaskType[]>>,
    taskToUpdate: TaskType | null, 
    setTaskToUpdate: Dispatch<SetStateAction<TaskType | null>>,
}