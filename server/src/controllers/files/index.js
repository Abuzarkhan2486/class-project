
import fs from "fs";
import path from "path";
import { internalError, success } from "../../utils/response.utils.js";

//
// ✅ CREATE FILE
//
export const createFile = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");
    const { folderName, fileName, content } = req.body;

    if (!folderName || !fileName) {
      return res.status(400).json({
        message: "folderName and fileName are required",
      });
    }

    const folderPath = path.resolve(BASE_DIR, folderName);
    const filePath = path.resolve(folderPath, fileName);

    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    fs.writeFile(filePath, content || "", (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "File created successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};

//
// ❌ DELETE FILE
//
export const deleteFile = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");
    const { folderName, fileName } = req.body;

    if (!folderName || !fileName) {
      return res.status(400).json({
        message: "folderName and fileName are required",
      });
    }

    const filePath = path.resolve(BASE_DIR, folderName, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    fs.unlink(filePath, (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "File deleted successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};

//
// ✏️ UPDATE FILE CONTENT
//
export const updateFileContent = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");
    const { folderName, fileName, content } = req.body;

    if (!folderName || !fileName) {
      return res.status(400).json({
        message: "folderName and fileName are required",
      });
    }

    const filePath = path.resolve(BASE_DIR, folderName, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    fs.writeFile(filePath, content || "", (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "File updated successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};

//
// ✏️ RENAME FILE
//
export const renameFile = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");
    const { folderName, oldFileName, newFileName } = req.body;

    if (!folderName || !oldFileName || !newFileName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const oldPath = path.resolve(BASE_DIR, folderName, oldFileName);
    const newPath = path.resolve(BASE_DIR, folderName, newFileName);

    if (!fs.existsSync(oldPath)) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    if (fs.existsSync(newPath)) {
      return res.status(400).json({
        message: "File with new name already exists",
      });
    }

    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "File renamed successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};