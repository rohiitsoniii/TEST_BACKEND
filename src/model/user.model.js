import mongoose from "mongoose";

const UserSchemma = new mongoose.Schema({
    firstname:{
        type:String ,
        required:true
    },
    lastname:{
        type:String
    },
    gender:{
        type:String
    },
    dob:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})



export const User = mongoose.model("User",UserSchemma)