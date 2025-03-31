
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Main } from "./MainContent";


export function Dashboard() {
 


  return (<div className="flex">
    <Sidebar/>
    <div className="w-8/10 min-h-screen flex flex-col "><TopBar/><Main/></div>
    
    </div>
  )
}