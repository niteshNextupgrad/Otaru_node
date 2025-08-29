import { model, Schema } from 'mongoose'

const adminSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 72
    },
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: "admin",
    },
    phone: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active",
    },
}, { timestamps: true })

const adminModel = model("Admin", adminSchema);

export default adminModel