import { TaskType } from "../types/taskType";
import { CircleX, Square, SquareCheckBig, SquarePen, Trash2 } from "lucide-react";
import { useContext, useRef } from "react";
import TasksContext from "../context/tasksContext";
import api from "../libs/api";
import toast from "react-hot-toast";


export default function ListTasks(){
    
    const {tasks, setTasks, titleTask, setTitleTask, filteredTasks, taskToUpdate, setTaskToUpdate} = useContext(TasksContext)

    function deleteTasks(slug:string){

       const deleteTaskSynchro = async (taskSlug:string) => {
           try{
               await api.delete<TaskType>(`tasks/${taskSlug}/`)
               const newListTasks = tasks.filter((task) => task.slug !== taskSlug)
               setTasks(newListTasks)
               toast.success("Tâche supprimée avec succès !");
   
           } catch(error){
               console.error("Erreur lors de la suppression de la tâche :", error);
               toast.error("Erreur : Impossible de supprimer la tâche.");
           }
       }
       deleteTaskSynchro(slug)
  }


    function completedTask(slug:string){
        const togglecompletedTaskSynchro = async (taskSlug:string) => {
            const cibleTask = tasks.find((task)=>task.slug === taskSlug )
            if(!cibleTask){
                return
            }

            const newStatutToggleCompleted = !(cibleTask.completed)

            try{
                const res = await api.patch(`tasks/${taskSlug}/`, {
                    completed: newStatutToggleCompleted,
                })

                const updatedTask = res.data

                const newListTask = tasks.map((task)=>
                    task.slug === taskSlug ? updatedTask : task
                )
                setTasks(newListTask)
                toast.success(newStatutToggleCompleted ? "Tâche marquée comme complétée." : "Tâche marquée comme non complétée.")
            } catch(error){
                console.error("Erreur lors de la modification de la tâche :", error);
                toast.error("Erreur : Impossible de mettre à jour la tâche.");
            }

        }

        togglecompletedTaskSynchro(slug)
    }

    
    const modalRef = useRef<HTMLDialogElement | null>(null);


    const openModal = (task: TaskType) => {
        setTaskToUpdate(task)
        setTitleTask(task.title)
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    
    };

    function updatetask(){
        
        if (!taskToUpdate || !taskToUpdate.slug) { 
            toast.error("Aucune tâche sélectionnée pour la modification.");
            return;
        }

        if (titleTask.trim() === "") {
            toast.error("Le titre ne peut pas être vide.");
            return; 
        }
        
        const taskSlug = taskToUpdate.slug;

        const updateTaskSynchro = async (taskSlug:string) => {

            const updatedTitle = titleTask
        
            try{

                const res = await api.patch(`tasks/${taskSlug}/`, {
                    title: updatedTitle,
                })
                const updatedTask = res.data

                const newListTask = tasks.map((task)=>
                    task.slug === taskSlug ? updatedTask : task
                )
                setTasks(newListTask)
                toast.success("Tâche modifiée avec succes")
                modalRef.current?.close()
                setTaskToUpdate(null) 
                setTitleTask("")
            
            } catch(error) {
                console.error("Erreur lors de la modification de la tâche", error)
                toast.error("Erreur lors de la modification de la tâche")
            }
        }
        updateTaskSynchro(taskSlug)
    }


    return <div className="w-12/12 flex flex-col justify-center items-center">
        <ul className="w-10/12 flex flex-col justify-center items-center gap-3">
            {filteredTasks.map((task:TaskType, index:number) => 
            <li key={task.id} className="w-10/12 flex flex-row justify-center items-center">
                <div className="w-1/12">
                    <div className="w-6 h-6 rounded-full aspect-square bg-gray-900 flex items-center justify-center">

                    {index + 1}
                    </div>
                </div>

                <div className={`w-8/12 text-center overflow-hidden whitespace-nowrap text-ellipsis ${task.completed ? "line-through" : ""}`}>
                    {task.title}
                </div>

                <div className="w-3/12 flex flex-row gap-1 items-center">
                    <button className="hover:bg-[#b6d4fe] hover:scale-105 hover:shadow-md transition-transform duration-200"  onClick={() => openModal(task)}><SquarePen color="#0d6efd" /></button>
                    <button className=" hover:scale-105 hover:shadow-md transition-transform duration-200" onClick={()=> completedTask(task.slug)}>{task.completed ? <SquareCheckBig color="#28a745" /> : <Square color="#28a745" />}</button>
                    <button className="hover:scale-105 hover:shadow-md transition-transform duration-200" onClick={() => deleteTasks(task.slug)}><Trash2 color="#dc3545" /></button>
                </div>
            </li>
            )}
        </ul>
            <dialog id="addTaskModal" ref={modalRef}  className="modal backdrop-blur">
                <div className="modal-box flex flex-col gap-5 bg-[#006989] dark:bg-[#075056]">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            <CircleX color="#FDF6E3" />
                        </button>
                        <h1 className="flex justify-center font-bold">Mofifier une tâche</h1>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <input className="input" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} type="text" name="titre_addTask" id="titre_addTask" placeholder="Entrer le titre de la tâche"/>
                        <button className="btn btn-soft bg-[#F4D47C] text-black py-1 px-2" onClick={updatetask}>Modifier</button>
                    </div>
                </div>
            </dialog> 

    

    </div>
}