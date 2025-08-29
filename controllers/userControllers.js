import bcrypt from "bcryptjs";
import createResponse from "../helpers/createResponse.js";
import userModel from "../models/user.js";
import cloudinary from "../config/cloudinary.js";
import jwt from 'jsonwebtoken'

// Create user (Register)
export const createUser = async (req, res) => {
    try {
        const { name, email, password, userType, phone } = req.body;
        if (!name || !email || !password) {
            return createResponse(res, false, "Missing required fields!", []);
        }

        // check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return createResponse(res, false, "Email already exists!", []);
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Upload profile image if exists
        let profileImageUrl = null;
        if (req.files && req.files.profileImage) {
            const file = req.files.profileImage; // from Postman form-data key: profileImage
            const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "user_profiles", // optional: Cloudinary folder
            });
            profileImageUrl = uploadResult.secure_url;
        }

        const UserData = new userModel({
            name,
            email,
            password: hashedPassword,
            userType,
            phone,
            profileImage: profileImageUrl, // saved Cloudinary URL
        });

        await UserData.save();

        return createResponse(res, true, "User created successfully!", {
            id: UserData._id,
            email: UserData.email,
            name: UserData.name,
            profileImage: UserData.profileImage,
        });
    } catch (error) {
        console.error("Error creating User:", error);
        return createResponse(res, false, "Internal Server Error!", []);
    }
};


// Login User
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return createResponse(res, false, "Email and password required!", []);
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return createResponse(res, false, "Invalid credentials!", []);
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return createResponse(res, false, "Invalid credentials!", []);
        }

        // create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.userType },
            process.env.JWT_SECRET || "supersecretkey",
            { expiresIn: "1d" } // token valid for 1 day
        );

        return createResponse(res, true, "Login successful!", {
            token,
            id: user._id,
            email: user.email,
            name: user.name,
            userType: user.userType,
        });
    } catch (error) {
        console.error("Login error:", error);
        return createResponse(res, false, "Internal Server Error!", []);
    }
};

// Get all user records

export const getUsers = async (resq, res) => {
    try {
        const data = await userModel.find();
        createResponse(res, true, 'user fetched successfully!', data)
    } catch (error) {
        console.error("failed to error:", error);
        return createResponse(res, false, "Internal Server Error!", []);
    }
}