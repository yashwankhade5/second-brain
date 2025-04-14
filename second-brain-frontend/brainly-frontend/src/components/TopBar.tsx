import  {Button}  from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/Share";


export function TopBar() {
    return<div className=" px-5 bg-[#e3e2e2d2]"><div className="flex  justify-between p-5 ">
    <div className="text-2xl font-bold">All Notes</div>
    <div className="flex ">
      <Button title={"Share Brain"} variant={"secondary"} size={"lg"} starticon={<ShareIcon/>}/>
      <Button title={"Add Content"} variant={"primary"} size={"lg"} starticon={<PlusIcon/>}/>
    </div>
    </div></div>
}