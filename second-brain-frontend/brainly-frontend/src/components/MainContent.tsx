import { Dustbin } from "../icons/Dustbin";
import { Shareicon } from "../icons/Share";
import { Bird } from "../icons/bird";

export function Main() {
    return <div className="flex-grow p-9 bg-green-400"> 
    <Card title={"Projectwww wwwwwww"} type={"twitter"}/>
    
    </div>
}

interface cardType{
    title:string,
    type:string
}
function Card(param:cardType) {
    return <div>
<div className="flex gap-5  pl-4 rounded-lg items-center max-w-60 p-2 bg-white"><div>{<Bird/>}</div><div className="flex flex-wrap max-w-30">{param.title}</div><div className="text-gray-500 pl-5"><Shareicon/></div><div>{<Dustbin/>}</div></div>
    </div>
}
