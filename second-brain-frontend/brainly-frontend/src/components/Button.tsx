
interface Buttonprops{
   starticon?:String,
   title:String,
   size:String
}


export function Button(p:Buttonprops) {
    return <button>
{p.starticon} {p.title}
    </button>
}