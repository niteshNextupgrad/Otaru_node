
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
        tags: { type: [String], default: [] },
        category: { type: String, default: "Marketing" },
        slug: { type: String, required: true, unique: true },
        date: { type: String, required: true },
    },
    { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
