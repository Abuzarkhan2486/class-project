import express from "express"
import dotenv from "dotenv"
dotenv.config()
import Router from "./routes/index.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"10mb"}))

app.get("/",(req,res)=>{
    res.send("hello")

})

app.use("/api/v1",Router)

export default app