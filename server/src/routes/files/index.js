import { Router } from "express";
import { createFile, deleteFile, renameFile } from "../../controllers/files/index.js";



const route = Router()

route.post("/create",createFile)
route.post("/delete",deleteFile)
route.post("/rename",renameFile)



export default route