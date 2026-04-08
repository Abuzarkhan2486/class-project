import { Router } from "express";
import route from "./folders/index"

const route= Router()

route.use("/folder",route)

export default route