import { Dustbin } from "../icons/Dustbin";
import { Shareicon } from "../icons/Share";
import { Bird } from "../icons/bird";

export function Main() {
    return <div className="flex-grow p-9 bg-green-400"> 
    <Card title={"project"} type={"twitter"}/>
    
    </div>
}

interface cardType{
    title:string,
    type:string
}
function Card(param:cardType) {
    return <div>
<div className="flex gap-4 items-center bg-white w-"><div>{<Bird/>}</div><div>{param.title}</div><div><Shareicon/></div><div>{<Dustbin/>}</div></div>
    </div>
}
