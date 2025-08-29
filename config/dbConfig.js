import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/otaru';
const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);

        if (conn) {
            console.log("MongoDB Connected");
        }
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

export default dbConnect;