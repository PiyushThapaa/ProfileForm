import express from "express";
import mongoose from "mongoose";

const app = express()


const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "ProfileFormBackend",
    }).then((c) => console.log(`Database connected with ${c.connection.host}`)).catch((e) => console.log(e))
}

connectDB()

app.get("/",(req,res)=>{
    res.send("Working")
})

app.listen(3000,()=>{
    console.log("Backend is running on port 3000")
})