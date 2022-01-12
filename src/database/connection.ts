import mongoose from "mongoose"
import {config} from "dotenv"

config()

mongoose.connect(process.env.MONGODB_URI!).then(()=>{
    console.log("Database connected");
}).catch((error)=>console.log(error))
