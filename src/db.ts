import mongoose from "mongoose"
import { object } from "zod"
 
const objectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const userSchema = new Schema({
    usernae:{type:String, requires:true, unique:true}
   , password:{type:String, required:true}

})
const tagSchema = new Schema({
    tag:{type:String, unique:true, required:true}

})
const contentSchema= new Schema({
    link:{type:String,required:true},
    type:{type:String, required:true},
    title:{type:String,required:true}
    ,tags:[{type:objectId, ref:'Tag'}]
    ,userId:{type:objectId,ref:'User',required:true}

})


const Usermodel= mongoose.model('User',userSchema)