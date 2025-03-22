import express from "express"
import { z } from "zod";
import { auth } from "./auth";
import mongoose from "mongoose"
import  cors  from "cors";
import jwt from "jsonwebtoken"
import { Usermodel,contentmodel,tagmodel,Linkmodel } from "./db";
const app = express()
const JWT_SECRET = "yash"

app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://Admin:tcYVqZuA115vHNNv@cluster0.bl0kz.mongodb.net/secondBrain")
app.post("/api/v1/signup",async (req,res)=>{
const username = req.body.username
const password = req.body.password
const schema = z.object({
    username: z.string().max(20).min(8).email(),
    password: z.string().min(8).max(14),
  })
try{
 let   result=schema.safeParse(req.body)
 if(result.success){
await Usermodel.create({
    username,
    password
})
res.json({
    "message":"successfully created account"
    
})
return}
else{
    res.json({
        "message":result.error.issues[0].message
    })
    return
}}
catch(e){
    res.status(411).json({"message":"account is not created"})
    return
}

})

app.post("/api/v1/signin",async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
   
    let user = await Usermodel.findOne({
        "username":username,
        "password":password
    })
    if (user) {
        res.json({
            "message":jwt.sign(user.id,JWT_SECRET)
        })
        
    }
    else{
        res.json({
            "message":"invalid credentials"
        })
    }



})


app.post("/api/v1/content",auth,async(req,res)=>{
    const {link,type,title} = req.body
    //  @ts-ignore
    const userId =req.userId
    
    try{
        
  const result = await contentmodel.create({
    "link":link,
    "type":type,
    "title":title,
    
    "userId":userId
  })
  res.status(200).json({
    "message":"content saved in second brain"
})
}catch(e){
    res.json({
        "message":"not created content",
        "error":e
    })
}

    
})

app.get("/api/v1/content",auth, async(req,res)=>{
    // @ts-ignore
  const userId = req.userId
  let result
  try{
 result = await contentmodel.find({
    "userId":userId
})
res.status(200).json({
    "message":result
})}catch(e){
    res.status(400).json({
        "messsage":result
    })
}
})

app.delete("/api/v1/content",auth,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId
    const id = req.body.id
   let result
   try{
   result = await contentmodel.deleteMany({
        "_id": id,
        "userId":userId
   })

   res.json({
    "message":"deleted sucessfully"
   })
}catch(e){
    res.json({
        "messsage":"sorry something went wrong try again"
    })
   }

})

app.post("/api/v1/share",(req,res)=>{

})

app.get("/api/v1/:sharelink",(req,res)=>{

})

app.listen(3000)