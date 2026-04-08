import { Router } from "express";
import { createFolder } from "../../controllers/folder";


const route = Router()

route.post("/create",createFolder)


export default route