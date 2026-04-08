import fs from "fs";
import path from "path";
import { internalError, success } from "../../utils/response.utils.js";

export const createFolder = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");
    const { folderName } = req.body;

    if (!folderName) {
      return res.status(400).json({
        message: "Folder name is required",
      });
    }

    // ✅ Full absolute path
    const folderPath = path.resolve(BASE_DIR, folderName);

    fs.mkdir(folderPath, { recursive: true }, (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "Folder created successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};




export const deleteFolder = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");
    const { folderName } = req.body;

    if (!folderName) {
      return res.status(400).json({
        message: "Folder name is required",
      });
    }

    // ✅ Full absolute path
    const folderPath = path.resolve(BASE_DIR, folderName);

    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    // ✅ Delete folder (even if it has files inside)
    fs.rm(folderPath, { recursive: true, force: true }, (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "Folder deleted successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};




export const renameFolder = async (req, res) => {
  try {
    const BASE_DIR = path.resolve(process.cwd(), "uploads");

    const { oldName, newName } = req.body;

    // ✅ Validation
    if (!oldName || !newName) {
      return res.status(400).json({
        message: "Both oldName and newName are required",
      });
    }

    // ✅ Build paths
    const oldPath = path.resolve(BASE_DIR, oldName);
    const newPath = path.resolve(BASE_DIR, newName);

    // ✅ Check if old folder exists
    if (!fs.existsSync(oldPath)) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }

    // ✅ Prevent overwrite
    if (fs.existsSync(newPath)) {
      return res.status(400).json({
        message: "Folder with new name already exists",
      });
    }

    // ✅ Rename folder
    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        return internalError(res, error.message);
      }

      return success(res, "Folder renamed successfully");
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};