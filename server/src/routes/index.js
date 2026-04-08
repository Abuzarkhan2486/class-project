import { Router } from "express";
import folderroute from "./folders/index.js"
import fileroute from "./files/index.js"

const router= Router()

router.use("/folder",folderroute)
router.use("/file",fileroute)

export default router