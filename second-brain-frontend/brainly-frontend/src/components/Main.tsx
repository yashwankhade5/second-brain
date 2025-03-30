import  {Button}  from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Shareicon } from "../icons/Share";


export function Main() {
    return<div className="w-8/10 min-h-screen px-6 bg-blue-100"><div className="flex  justify-between p-5 ">
    <div className="text-2xl font-bold">All Notes</div>
    <div className="flex ">
      <Button title={"Share Brain"} variant={"primary"} size={"lg"} starticon={<Shareicon/>}/>
      <Button title={"Add Content"} variant={"secondary"} size={"lg"} starticon={<PlusIcon/>}/>
    </div>
    </div></div>
}