import mongoose,{model,Schema} from "mongoose"

 
const objectId = mongoose.Schema.Types.ObjectId


const userSchema = new Schema({
    username:{type:String, required:true, unique:true}
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


const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})


export const Usermodel= model('User',userSchema)
export const tagmodel= model('tag', tagSchema)
export const contentmodel= model('content',contentSchema)
export const Linkmodel= model('Link',LinkSchema)