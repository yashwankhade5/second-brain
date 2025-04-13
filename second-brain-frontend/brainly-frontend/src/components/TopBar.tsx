import  {Button}  from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/Share";


export function TopBar() {
    return<div className=" px-5 bg-blue-100"><div className="flex  justify-between p-5 ">
    <div className="text-2xl font-bold">All Notes</div>
    <div className="flex ">
      <Button title={"Share Brain"} variant={"primary"} size={"lg"} starticon={<ShareIcon/>}/>
      <Button title={"Add Content"} variant={"secondary"} size={"lg"} starticon={<PlusIcon/>}/>
    </div>
    </div></div>
}