import { Dustbin } from "../icons/Dustbin";
import { Shareicon } from "../icons/Share";
import { Bird } from "../icons/Bird";

export function Main() {
    return  <div className="flex-grow items-start flex-wrap flex gap-3 p-9 bg-green-400"> 
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} type={"twitter"}/>
   
    
    
    </div>
}

interface cardType{
    title:string,
    type:"youtube" | "twitter"
}
function Card(param:cardType) {
    return <div className="max-w-80 p-2 pb-9 h-auto rounded-lg bg-white">
<div className="flex gap-3  mb-3 rounded-lg items-center max-w-80 p-2 bg-white"><div>{<Bird/>}</div><div className="flex w-70">{param.title}</div><div className="text-gray-500 "><Shareicon/></div><div>{<Dustbin/>}</div></div>
<iframe
                            className="w-full"
                            src={"https://www.youtube.com/embed/DDo_RPrYZH0?si=7XdjBZs1jWZUU9Iv"}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        

    </div>
}
