import { error } from "console"
import fs from "fs"
import { internalError, success } from "../../utils/response.utils"

export const createFolder = async (req, res) => {

    const { folderName } = req.body


    if (folderName) {
        fs.mkdir(`./${folderName}`, { recursive: true }, (error) => {
            if (error) {
                return res.status(500).json({
                    message:"sometghing wrong"
                })
            }
        })
    }

return success(res,'asjfhjshf');

}