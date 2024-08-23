import {User} from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const RegisterUser = asyncHandler(async (req, res, next) => {    
    const {firstname,lastname,gender,dob,email,password} = req.body
    if(!firstname  || !gender || !dob || !email || !password){
        return next(new ApiError("All fields are required", 400));
    }
    const user = await User.findOne({email});
    if(user){
        return next(new ApiError("User already exists", 400));
    }
   const hashPass = await bcrypt.hash(password, 10);
   const newUser = new User({
    firstname,
    lastname,
    gender,
    dob,
    email,
    password:hashPass
   })
   await newUser.save();

   const checkUser = await User.findOne({email});
   if(!checkUser){
       return next(new ApiError("error while creating user", 400));
   }
   const token = jwt.sign({id:newUser._id}, 123421211, {expiresIn: "1h"});


   return res.status(200).json(new ApiResponse(200, "User created successfully", {token}))



})

const LoginUser = asyncHandler(async (req, res, next) => {    
    const {email, password} = req.body
    if(!email || !password){
        return next(new ApiError("All fields are required", 400));
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new ApiError("User not found", 400));
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if(!checkPass){
        return next(new ApiError("Incorrect Password", 400));
    }
    const token = jwt.sign({id:user._id}, 123421211, {expiresIn: "1h"});
    return res.status(200).json(new ApiResponse(200, "User logged in successfully", {token}))

}
)
const ChnagePassword = asyncHandler(async (req, res, next) => {
    const user = req.user

    const {oldPassword, newPassword} = req.body
    if(!oldPassword || !newPassword){
        return next(new ApiError("All fields are required", 400));
    }
    const checkPass = await bcrypt.compare(oldPassword, user.password);
    if(!checkPass){
        return next(new ApiError("Incorrect Password", 400));
    }
    const hashPass = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {password:hashPass})
    return res.status(200).json(new ApiResponse(200, "Password changed successfully"))
})


const UpdateDetails = asyncHandler(async (req, res, next) => {
    const user = req.user
    const {firstname,lastname,gender,dob} = req.body
    if(!firstname || !lastname || !gender || !dob){
        return next(new ApiError("All fields are required", 400));
    }
    await User.findByIdAndUpdate(user._id, {firstname,lastname,gender,dob})
    return res.status(200).json(new ApiResponse(200, "Details updated successfully"))
})

const checkConnection = asyncHandler(async (req, res, next) => {
    return res.status(200).json("connected")
})




export {RegisterUser,LoginUser,ChnagePassword,UpdateDetails,checkConnection}