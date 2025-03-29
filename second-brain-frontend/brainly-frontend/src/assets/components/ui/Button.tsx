

export interface Buttonprops {
    variant:"primary" | "secondary";
    size: "sm" | "md" | "lg"
    text: string;
    starticon?:any;
    endicon?:any;
    onClick: ()=> void

}

export const Button=(props:Buttonprops)=>{

    return <button></button>
}
<Button variant={"primary"} size="md" onClick={()=>{}} text={"dse"}/>