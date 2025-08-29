import cloudinary from "../config/cloudinary.js";
import createResponse from "../helpers/createResponse.js";
import productModel from "../models/product.js";

// Add new product
export const addProduct = async (req, res) => {
    try {
        const { title, price, category, description } = req.body;

        // Check required fields
        if (!title || !price || !category || !description) {
            return createResponse(res, false, "All fields are required!", [])
        }

        // Check if image is provided
        if (!req.files || !req.files.image) {
            return createResponse(res, false, "Product Image required!", [])
        }

        // Upload product image
        const file = req.files.image;
        const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "products",
        });

        const newProduct = new productModel({
            title,
            price,
            category,
            description,
            image: uploadResult.secure_url,
        });

        await newProduct.save();
        return createResponse(res, true, "Product added successfully!", newProduct)

    } catch (error) {
        console.error("Error adding product:", error);
        return createResponse(res, false, "Internal Server Error!", [])
    }
};
export const getProducts = async (resq, res) => {
    try {
        const data = await productModel.find();
        createResponse(res, true, 'product fetched successfully!', data)
    } catch (error) {
        console.error("failed to error:", error);
        return createResponse(res, false, "Internal Server Error!", []);
    }
}