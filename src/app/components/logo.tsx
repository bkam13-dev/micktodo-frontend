import Image from "next/image"
import logo from "../../../public/Logo_principal_MickTodo.svg"


export default function Logo(){

    return <div className="w-80 h-40 flex items-center ">
        <Image src={logo} alt="Logo MickTodo"/>
    </div>
}