import { Bird } from "../icons/Bird"
import { Brain } from "../icons/Brain"
import { YouTube } from "../icons/Youtube"

export function Sidebar() {
    return<div className="flex-grow bg-white border-slate-50">

<div className="text-xl flex gap-4 font-semibold items-center mt-4 mx-5"><Brain/> Second Brain</div>

<SideOptionYoutube type="youtube"/>
<SideOptionYoutube type="twitter"/>


    </div>
}


    


function SideOptionYoutube({type}:{type:string}) {
    return<div className=" px-4 py-3 my-5 mx-3 rounded-md cursor-pointer hover:bg-slate-500">{type=='youtube'?<div className="flex gap-x-4 items-center"><YouTube/> YouTube</div>:<div className="flex gap-x-4 items-center"><Bird/> Tweets</div>}</div>
}
