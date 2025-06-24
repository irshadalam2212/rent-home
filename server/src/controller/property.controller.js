import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Property } from "../models/property.model.js"
import { ApiResponse } from "../utils/apiResponse.js";

const createProperty = asyncHandler(async (req, res) => {
    // get all details from front-end
    try {
        const { propertyName, rooms, propertyType, rent, location, propertyImage, description, host } = req.body;

        // check if all required fields are provided
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

        if (property) {
            return res.status(200).json(
                new ApiResponse(201, property, "Property created successfully")
            )
        }
    } catch (error) {
        console.error("Error creating property:", error)
        return new ApiError(500, "Internal server error while creating property")
    }
})

const getAllProperty = asyncHandler(async (req, res) => {
    try {
        const property = await Property.find({})
        if (property) {
            return res.status(200).json(
                new ApiResponse(200, property, "All properties fetched successfully")
            )
        } else {
            return new ApiError(404, "No properties found");
        }
    } catch (error) {
        console.error("Error fetching properties:", error);
        return new ApiError(500, "Internal server error while fetching properties");
    }
})

const UpdateProperty = asyncHandler(async (req, res) => {
    try {
        const { propertyName, rooms, propertyType, rent, location, propertyImage, description } = req.body
        if ([propertyName, rooms, propertyType, rent, location].some(field => field?.trim() === "")) {
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
        const updateProperty = await Property.findByIdAndUpdate(
            req.params?._id,
            {
                $set: {
                    propertyName,
                    rooms,
                    propertyType,
                    rent,
                    location,
                    description,
                    propertyImage: propertyImageUrl
                }
            }, { new: true }
        )

        if (!updateProperty) {
            throw new ApiError(404, "Property not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, updateProperty, "Property details updated successfully"))

    } catch (error) {
        console.error("Error updating property:", error);
        return new ApiError(500, "Internal server error while updating property");

    }
})

export {
    createProperty,
    getAllProperty,
    UpdateProperty
}