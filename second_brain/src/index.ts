import express from "express"
import { z } from "zod";
import { auth } from "./auth";
import * as dotenv from "dotenv";
import mongoose from "mongoose"
import cors from "cors";
import jwt from "jsonwebtoken"
import { Usermodel, contentmodel, tagmodel, Linkmodel } from "./db";
import { random } from "./util";
const app = express()
const JWT_SECRET = "kirat"
const JWT_SHARE = "kirat1"
dotenv.config()

const mongooseUrl = process.env.Mongoose
if (!mongooseUrl) {
    throw new Error("mongoose is not string");

}
app.use(cors())
app.use(express.json())


mongoose.connect(mongooseUrl)
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const schema = z.object({
        username: z.string().max(20).min(8).email(),
        password: z.string().min(8).max(14),
    })
    try {
        let result = schema.safeParse(req.body)
        if (result.success) {
            await Usermodel.create({
                username,
                password
            })
            res.json({
                "message": "successfully created account"

            })
            return
        }
        else {
            res.json({
                "message": result.error.issues[0].message
            })
            return
        }
    }
    catch (e) {
        res.status(411).json({ "message": "account is not created" + e })
        return
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let user = await Usermodel.findOne({
        "username": username,
        "password": password
    })
    if (user) {
        res.json({
            "message": jwt.sign(user.id, JWT_SECRET)
        })

    }
    else {
        res.json({
            "message": "invalid credentials"
        })
    }



})


app.post("/api/v1/content", auth, async (req, res) => {
    const { link, type, title } = req.body

    const userId = req.userId

    try {

        const result = await contentmodel.create({
            "link": link,
            "type": type,
            "title": title,

            "userId": userId
        })
        res.status(200).json({
            "message": "content saved in second brain"
        })
    } catch (e) {
        res.json({
            "message": "not created content",
            "error": e
        })
    }


})

app.get("/api/v1/content", auth, async (req, res) => {

    const userId = req.userId
    let result
    try {
        result = await contentmodel.find({
            "userId": userId
        }).populate('userId','username')
        res.status(200).json({
            "message": result
        })
    } catch (e) {
        res.status(400).json({
            "messsage": "not content"
        })
    }
})

app.delete("/api/v1/content", auth, async (req, res) => {

    const userId = req.userId
    const id = req.body.id

    try {
        await contentmodel.deleteMany({
            "_id": id,
            "userId": userId
        })

        res.json({
            "message": "deleted sucessfully"
        })
    } catch (e) {
        res.json({
            "messsage": "sorry something went wrong try again"
        })
    }

})

app.post("/api/v1/share", auth, async (req, res) => {

    const share = req.body.share
    if (share) {
        const existingLink = await Linkmodel.findOne({
            userId: req.userId
        })
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return
        } else {
            const hash = random(10)
            await Linkmodel.create({
                hash,
                userId: req.userId
            })
            res.json({
                hash: hash
            })
        }

    } else {
        await Linkmodel.deleteMany({
            userId: req.userId
        })
        res.json({
            message: "Removed shareable link"
        })
    }
})

app.get("/api/v1/:sharelink", async (req, res) => {
    const token = req.params.sharelink

    const linked = await Linkmodel.findOne({
        "hash": token
    })
    if (!linked) {
        res.json({
            "message": "not exist"
        })
        return
    }
    const user = await Usermodel.findOne({
        _id: linked.userId
    })
    if (!user) {
        res.json({
            message: "user not found"
        })
        return
    }
    const content = await contentmodel.findOne({
        userId: linked.userId
    })
    res.json({
        username: user.username,
        message: content
    })

})

app.listen(3000)
