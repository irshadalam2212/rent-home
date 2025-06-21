import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Property } from "../models/property.model.js"

const createProperty = asyncHandler(async (req, res) => {
    // get all details from front-end
    try {
        const { propertyName, rooms, propertyType, rent, location, propertyImage, description, host } = req.body;

        // check if all required fields are provided
        console.log({ propertyName, rooms, propertyType, rent, location })
        console.log(req.body)

        if ([propertyName, rooms, propertyType, rent, location].some(field => field?.trim() === "")) {
            // return res.status(400).json({ status: 400, message: "All fields are required" });
            throw new ApiError(400, "Please fill all the required fields");
        }

        // Upload image if provided
        let propertyImageUrl = "";
        if (req.files && Array.isArray(req.files.propertyImage) && req.files.propertyImage.length > 0) {
            const propertyImageLocalPath = req.files.propertyImage[0].path;

            const uploadedImage = await uploadOnCloudinary(propertyImageLocalPath);

            if (!uploadedImage?.url) {
                throw new ApiError(500, "Image upload failed");
            }

            propertyImageUrl = uploadedImage.url;
        }

        const property = await Property.create({
            propertyName,
            rooms,
            propertyType,
            rent,
            location,
            description,
            host,
            propertyImage: propertyImageUrl
        })

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            data: property
        });
    } catch (error) {
        console.error("Error creating property:", error)
        return new ApiError(500, "Internal server error while creating property")
    }
})

export {
    createProperty
}