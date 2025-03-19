import express from "express"
import { z } from "zod";
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
    console.log(req.headers)
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


app.post("/api/v1/content",(req,res)=>{
    
    
})

app.get("/api/v1/content",(req,res)=>{

})

app.delete("/api/v1/content",(req,res)=>{

})

app.post("/api/v1/share",(req,res)=>{

})

app.get("/api/v1/:sharelink",(req,res)=>{

})

app.listen(3000)