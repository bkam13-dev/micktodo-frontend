import { useContext, useRef, MouseEvent } from "react"
import {TaskType} from '../types/taskType'
import toast from "react-hot-toast"
import api from "../libs/api"
import { CirclePlus, CircleX } from "lucide-react"
import TasksContext from "../context/tasksContext"

export default function AddTask(){

    const {tasks, setTasks, titleTask, setTitleTask, setIsPopupAddOpen} = useContext(TasksContext)

    async function addNewTask(){
        if (titleTask.trim() === "") {
            toast.error("Veuillez entrer un titre de tâche");
            return;
        } else{
            try{
                const donneeEnvoyee = {
                    title : titleTask.trim(),                 
                }
    
                const res = await api.post<TaskType>("tasks/", donneeEnvoyee)
                const newDbTask = res.data
                const newlistTasks:TaskType[] = [...tasks, newDbTask]
                setTasks(newlistTasks)
                toast.success("Tâche ajoutée avec succès !");
            } catch(error){
                console.error("Erreur lors de l'ajout de la tâche :", error);
                toast.error("Erreur: Impossible d'enregistrer la tâche.");
            } finally{
                setTitleTask("");
                setIsPopupAddOpen(false);                
            }

        }
    }


    const modalRef = useRef<HTMLDialogElement | null>(null);

    const openModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (modalRef.current) {
            modalRef.current.showModal();
        }
    
    };
    
    


    return <div className="w-12/12 relative h-0 ">

        <button className="btn fixed bottom-25 right-10 z-10" onClick={openModal}><CirclePlus color="#0d6efd" /></button>
        <dialog id="addTaskModal" ref={modalRef} className="modal backdrop-blur ">
            <div className="modal-box flex flex-col gap-5 bg-[#006989] dark:bg-[#075056]">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <CircleX color="#FDF6E3" />
                    </button>
                    <h1 className="flex justify-center font-bold">Ajouter une tâche</h1>
                </form>
                <div className="flex flex-col justify-center items-center gap-3">
                    <input className="input" value={titleTask} onChange={(e)=> setTitleTask(e.target.value)} type="text" name="titre_addTask" id="titre_addTask" placeholder="Entrer le titre de la tâche"/>
                    <button className="btn btn-soft bg-[#F4D47C] text-black" onClick={() => addNewTask()}>Ajouter</button>
                </div>
            </div>
        </dialog>

    </div>
}