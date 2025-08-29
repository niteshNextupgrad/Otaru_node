import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createResponse from "../helpers/createResponse.js";
import adminModel from "../models/admin.js";

// Create Admin (Register)
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, userType, phone, profileImage } = req.body;

    if (!name || !email || !password) {
      return createResponse(res, false, "Missing required fields!", []);
    }

    // check if email already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return createResponse(res, false, "Email already exists!", []);
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminData = new adminModel({
      name,
      email,
      password: hashedPassword,
      userType,
      phone,
      profileImage,
    });

    await adminData.save();

    return createResponse(res, true, "Admin created successfully!", {
      id: adminData._id,
      email: adminData.email,
      name: adminData.name,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return createResponse(res, false, "Internal Server Error!", []);
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createResponse(res, false, "Email and password required!", []);
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return createResponse(res, false, "Invalid credentials!", []);
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return createResponse(res, false, "Invalid credentials!", []);
    }

    // create JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.userType },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" } // token valid for 1 day
    );

    return createResponse(res, true, "Login successful!", {
      token,
      id: admin._id,
      email: admin.email,
      name: admin.name,
      userType: admin.userType,
    });
  } catch (error) {
    console.error("Login error:", error);
    return createResponse(res, false, "Internal Server Error!", []);
  }
};
