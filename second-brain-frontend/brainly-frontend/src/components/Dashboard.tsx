
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Main } from "./MainContent";
import { Bird } from "../icons/bird";



export function Dashboard() {
 


  return (<div className="flex ">
    <Sidebar/>
    <div className="w-8/10 min-h-screen flex flex-col "><TopBar/><Main/></div>
    
    </div>
  )
}