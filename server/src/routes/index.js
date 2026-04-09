import { Router } from "express";
import folderroute from "./folders/index.js"
import fileroute from "./files/index.js"
import authroute from "./auth/index.js"

const router= Router()

router.use("/folder",folderroute)
router.use("/file",fileroute)
router.use("/auth",authroute)

export default router