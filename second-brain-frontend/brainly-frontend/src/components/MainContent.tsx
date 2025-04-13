import { Dustbin } from "../icons/Dustbin";
import { ShareIcon } from "../icons/Share";
import { Bird } from "../icons/Bird";

export function Main() {
    return  <div className="flex-grow items-start flex-wrap flex gap-3 p-9 bg-green-400"> 
    <Card title={"Project Idea nameww frgrgg it"} link={"https://www.youtube.com/watch?v=8_uNrBN3f2Q"} type={"youtube"}/>
    <Card title={"Project Idea nameww frgrgg it"} link={"https://twitter.com/tweet/status/1903543461934235680?ref_src=twsrc%5Etfw"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} link={"https://twitter.com/tweet/status/1903543461934235680?ref_src=twsrc%5Etfw"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} link={"https://twitter.com/tweet/status/1903543461934235680?ref_src=twsrc%5Etfw"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} link={"https://twitter.com/tweet/status/1903543461934235680?ref_src=twsrc%5Etfw"} type={"twitter"}/>
    <Card title={"Project Idea nameww frgrgg it"} link={"https://twitter.com/tweet/status/1903543461934235680?ref_src=twsrc%5Etfw"} type={"twitter"}/>

    
    
    
    </div>
}



interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({title, link, type}: CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet"><p lang="en" dir="ltr">&quot;Make comedy legal again. Yeah!&quot; - Elon Musk, March 2025 <a href={link.replace("x.com", "twitter.com")}></a></p>&mdash; Tweet (@tweet) <a href="https://twitter.com/tweet/status/1903543461934235680?ref_src=twsrc%5Etfw">March 22, 2025</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                     
                </blockquote>}
            </div>

        </div>
    </div>
}