import express from "express"
import dotenv from "dotenv"
dotenv.config()
import authroutes from "./routes/AuthRoutes.js"
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")

})

app.use("/api",authroutes)

export default app