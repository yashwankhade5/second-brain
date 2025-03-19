import {Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { string } from "zod";
const JWT_SECRET ="yash"



export function auth(req:Request,res:Response,next:NextFunction) {
    const head = req.headers["authorization"] ;
    const token = head
    try{
        if (token) {
            const decoded = jwt.verify(token  ,JWT_SECRET) 
                  // @ts-ignore
                req.userId =decoded.id
        }
        
   
    next()
    }catch(e){
        res.json({
            "message":"invaild token",
            "error":e
        })
        return
    }
   
   
}