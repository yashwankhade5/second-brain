import { ReactElement } from "react"

interface Buttonprops{
   starticon?:ReactElement,
   title:String,
   size:String
}


export function Button(p:Buttonprops) {
    return <button className="flex border gap-2 justify-center items-center p-1 px-5 rounded-md cursor-pointer rounded-8 bg-blue-500 text-white ">
{p.starticon} {p.title}
    </button>
}