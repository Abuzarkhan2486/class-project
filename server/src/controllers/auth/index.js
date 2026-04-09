
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.models.js";
import { internalError, success } from "../../utils/response.utils.js";



//
// ✅ REGISTER
//
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return success(res, "User registered successfully", user);
  } catch (err) {
    return internalError(res, err.message);
  }
};

//
// 🔑 LOGIN
//
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return success(res, "Login successful", {
      user,
    });
  } catch (err) {
    return internalError(res, err.message);
  }
};