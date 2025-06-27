import express from "express";
import mongoose from "mongoose";
import { profileUpdate } from "./controller.js";
import { singleUpload } from "./multer.js";


const app = express()
app.use(express.json())

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "ProfileFormBackend",
    }).then((c) => console.log(`Database connected with ${c.connection.host}`)).catch((e) => console.log(e))
}

connectDB()

app.post('/api/profile', singleUpload, profileUpdate)

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"App Working"
    })
})

app.listen(3000,()=>{
    console.log("Backend is running on port 3000")
})