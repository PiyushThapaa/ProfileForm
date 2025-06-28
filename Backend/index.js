import express from "express";
import mongoose from "mongoose";
import { profileUpdate, updatepass, username } from "./controller.js";
import { singleUpload } from "./multer.js";
import cors from "cors"
import { config } from "dotenv"

config({
    path: "./config.env"
})
const app = express()
app.use(cors())
app.use(express.json())

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "ProfileFormBackend",
    }).then((c) => console.log(`Database connected with ${c.connection.host}`)).catch((e) => console.log(e))
}

connectDB()

app.post('/api/profile', singleUpload, profileUpdate)
app.post('/api/username', username)
app.post('/api/updatepass', updatepass)

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"App Working"
    })
})

app.listen(3000,()=>{
    console.log("Backend is running on port 3000")
})