import { Router } from "express";
import { createFolder, deleteFolder, renameFolder } from "../../controllers/folder/index.js";


const route = Router()

route.post("/create",createFolder)
route.post("/delete",deleteFolder)
route.post("/rename",renameFolder)



export default route