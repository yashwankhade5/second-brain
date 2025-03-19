import {Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { string } from "zod";
const JWT_SECRET ="yash"

type sc= string | undefined

export function auth(req:Request,res:Response,next:NextFunction) {
    const head = req.headers["authorization"] ;
    const token = head
    const decoded = jwt.verify(token as string ,JWT_SECRET)
    // @ts-ignore
    req.decoded =decoded
}