import { Router } from "express";
import route from "./folders/index.js"

const router= Router()

router.use("/folder",route)

export default router