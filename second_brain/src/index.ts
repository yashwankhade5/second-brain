import express from "express"
import { z } from "zod";
import { auth } from "./auth";
import * as dotenv from "dotenv";
import mongoose from "mongoose"
import  cors  from "cors";
import jwt from "jsonwebtoken"
import { Usermodel,contentmodel,tagmodel,Linkmodel } from "./db";
const app = express()
const JWT_SECRET = "yash"
const JWT_SHARE = "YASH1"
dotenv.config()

const mongooseUrl = process.env.Mongoose 
if (!mongooseUrl) {
    throw new Error("mongoose is not string");
    
}
app.use(cors())


mongoose.connect(mongooseUrl)
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

app.post("/api/v1/share",auth,(req,res)=>{
       // @ts-ignore
    const userId = req.userId
    res.json({
        "message":`${req.hostname}:${3000}/api/v1/${jwt.sign(userId,JWT_SHARE)}`
    })
})

app.get("/api/v1/:sharelink",async(req,res)=>{
  const token  = req.params.sharelink

  const userId = jwt.verify(token,JWT_SHARE)
  let result
  try {
    result = await contentmodel.find({
        "userId":userId
    })
    res.json({
        "message":result
      })
  } catch (error) {
    res.json({
        "message":"something went wrong"
    })
  }
 
})

app.listen(3000)
