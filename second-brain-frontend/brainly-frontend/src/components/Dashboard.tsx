import { PlusIcon } from "../icons/PlusIcon";
import { Shareicon } from "../icons/Share";
import { Button } from "./Button";


export function Dashboard() {
 


  return (
    <div className="flex ">
      <Button title={"Share Brain"} size={"md"} starticon={<Shareicon/>}/>
      <Button title={"Add Content"} size={"md"} starticon={<PlusIcon/>}/>
    </div>
  )
}