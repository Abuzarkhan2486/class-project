import { Router } from "express";
import { createFolder, deleteFolder } from "../../controllers/folder/index.js";


const route = Router()

route.post("/create",createFolder)
route.post("/delete",deleteFolder)



export default route