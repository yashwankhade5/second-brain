
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";


export function Dashboard() {
 


  return (<div className="flex">
    <Sidebar/>
    <div className="w-8/10 min-h-screen  "><TopBar/></div>
    
    </div>
  )
}