"use client"


import { TaskType } from "./types/taskType";
import {useEffect, useMemo, useState } from "react";
import api from "./libs/api";
import toast from "react-hot-toast";
import Logo from "./components/logo";
import ListTasks from "./components/listTasks"
import SearchBar from "./components/searchBar"
import AddTask from "./components/addTask"
import TasksContext from "./context/tasksContext";


export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [completed, setCompleted] = useState(false)
  const [search, setSearch] = useState("")
  const [titleTask, setTitleTask] = useState("")
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  const [filteredTasks, setFilteredTasks ]= useState<TaskType[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<TaskType | null>(null)


  const getTasks = async () => {
    try{
      const res = await api.get<TaskType[]>("tasks/")
      console.log(res)
      setTasks(res.data)
      toast.success("tâches chargée")
    } catch (error) {
      console.error("Erreur de chargement tâches", error)
      toast.error("Erreur de chargement tâches")
    }
  }


  useEffect(()=>{
    getTasks()
  }, [])





  const listFilteredTasks = useMemo(() => {
    return tasks.filter((task) =>{
      const title = task.title
      return ( title.toLowerCase().includes(search.toLowerCase())  ) 
  })}, [search, tasks])

  useEffect(() => {
    setFilteredTasks(listFilteredTasks)
  }, [listFilteredTasks])


const valueTasksContext = {
  tasks,
  setTasks,
  completed, 
  setCompleted,
  titleTask, 
  setTitleTask,
  search, 
  setSearch,
  isPopupAddOpen, 
  setIsPopupAddOpen,
  filteredTasks,
  setFilteredTasks,
  taskToUpdate, 
  setTaskToUpdate,
}

  return <TasksContext.Provider value={valueTasksContext}>

    <div className="w-12/12 min-h-screen py-10 flex flex-col gap-10 items-center text-black bg-[#FFFBEB] dark:text-white dark:bg-[#233038]">
        <Logo/>
        <SearchBar />
        <AddTask/>
        <ListTasks />
    </div>
  </TasksContext.Provider>
  
}
