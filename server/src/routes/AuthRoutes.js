import express from "express"
import { logginController } from "../controllers/AuthController.js"


const route= express.Router()



route.get("/loggin",logginController)



export default route