import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Property } from "../models/property.model.js"
import { ApiResponse } from "../utils/apiResponse.js";
import axios from "axios";

const createProperty = asyncHandler(async (req, res) => {
    // get all details from front-end
    try {
        const { propertyName, rooms, propertyType, rent, location, description, host } = req.body;

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
            propertyName: propertyName.trim().toLowerCase(),
            rooms: Number(rooms),
            propertyType: propertyType.trim().toLowerCase(),
            rent: Number(rent),
            location: location.trim().toLowerCase(),
            description,
            host,
            propertyImage: propertyImageUrl,
        });

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
    // console.log(req, "req.params?._id")
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
        const propertyId = req.params.propertyId;
        const updateProperty = await Property.findByIdAndUpdate(
            propertyId,
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
            .json(new ApiResponse(200, [], "Property details updated successfully"))

    } catch (error) {
        console.error("Error updating property:", error);
        return new ApiError(500, "Internal server error while updating property");

    }
})

const getPropertyById = asyncHandler(async (req, res) => {
    const propertyId = req.params.propertyId;
    if (!propertyId) {
        return res.status(400).json(
            new ApiError(400, "Property ID is required")
        );
    }

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json(
                new ApiError(404, "Property not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, property, "Property fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching property by ID:", error);
        return res.status(500).json(
            new ApiError(500, "Internal server error while fetching property by ID")
        );
    }
});

const deletePropertyById = asyncHandler(async (req, res) => {
    const propertyId = await req.params.propertyId;

    if (!propertyId) {
        return res.status(400).json(
            new ApiError(400, "Property ID is required")
        )
    }

    try {
        const property = await Property.findByIdAndDelete(propertyId)
        if (!property) {
            return res.status(404).json(
                new ApiError(404, "Property not found")
            );
        }
        return res.status(200).json(
            new ApiResponse(200, property, "Property deleted successfully!")
        );
    } catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).json(
            new ApiError(500, "Internal server error while deleting property.")
        );
    }
})

const getTrendingLocations = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        throw new ApiError(400, "Latitude and longitude are required")
    }

    const radius = 20000 // 20km
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    const types = [
        "tourist_attraction",
        "park",
        "hindu_temple",
        "mosque",
        "church",
        "museum",
        "art_gallery",
        "zoo",
        "aquarium",
        "shopping_mall",
        "amusement_park",
        "stadium",
        "university",
        "natural_feature"
    ]

    const allResults = []

    try {
        for (const type of types) {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
            const response = await axios.get(url)
            const results = response?.data?.results || []

            for (const place of results) {
                allResults.push({
                    name: place?.name,
                    type,
                    address: place?.vicinity,
                    location: place?.geometry?.location,
                    rating: place.rating || null,
                    user_ratings_total: place?.user_ratings_total || 0,
                    icon: place?.icon,
                    place_id: place?.place_id
                })
            }
        }
        // Optionally sort by popularity
        const sorted = allResults.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

        return res.status(200).json(
            new ApiResponse(200, sorted.slice(0, 30), "Trending locations near you fetched successfully")
        );

    } catch (error) {
        console.error("Error fetching trending places:", error.message);
        throw new ApiError(500, "Failed to fetch trending locations");
    }
})

export {
    createProperty,
    getAllProperty,
    UpdateProperty,
    getPropertyById,
    getTrendingLocations,
    deletePropertyById
}