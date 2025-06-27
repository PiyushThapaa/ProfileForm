import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    photo: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    profession:{
        type:String,
        enum:["Student", "Developer", "Entrepreneur"],
        required: true
    },
    address:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    subscription:{
        type:String,
        enum:["Basic", "Pro", "Enterprise"],
        required: true
    },
    
    newsletter:{
        type:Boolean,
        default:true,
        required: true
    },
},{
    timestamps:true
})

export const Profile = mongoose.model("profile",profileSchema)