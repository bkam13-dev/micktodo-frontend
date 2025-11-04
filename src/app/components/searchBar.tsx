import { useContext } from "react"
import TasksContext from "../context/tasksContext"


export default function SearchBar(){
    const { search, setSearch} = useContext(TasksContext)

    return <div>
        <input className="input bg-white dark:bg-[#222428] " value={search} onChange={(e)=> setSearch(e.target.value)} type="search" name="search" id="searchbar" />
    </div>
}