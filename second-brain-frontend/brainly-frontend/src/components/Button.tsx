import { ReactElement } from "react"

interface Buttonprops{
   starticon?:ReactElement,
   title:String,
   size:"lg",
   variant:"primary"|"secondary"
}
const stylebutton = {
        "lg":"p-1 px-5 rounded-md"
}
const variantstyle={
    "primary":" bg-blue-500 text-white",
    "secondary": "bg-white-200 text-blue-500"
}
const deafultClass:string="flex border gap-2 justify-center items-center mt-2 ml-3 cursor-pointer"


export function Button(p:Buttonprops) {
   
    return <button className={`${deafultClass} ${variantstyle[p.variant]} ${stylebutton[p.size]}`}>
{p.starticon} {p.title}
    </button>
}