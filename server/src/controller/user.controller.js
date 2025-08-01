import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessTokenAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong while generating access and refresh token"))
    }
}

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (
        [email, name, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"))
    }

    const existingUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (existingUser) {
        return res.status(409).json(new ApiResponse(409, "User with email or name is already exists"))
    }

    const user = await User.create({
        name: name.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(500).json(new ApiResponse(500, "Something went wrong while registering user"))
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    )
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json(new ApiResponse(400, "Email is required"))
    }

    if (!password) {
        return res.status(400).json(new ApiResponse(400, "Password is required"))
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(404).json(new ApiResponse(404, "No user found"))
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(401).json(new ApiResponse(401, "Invalid user credentials"))
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.find({}).select("-password -refreshToken")
        if (user) {
            return res.status(200).json(
                new ApiResponse(200, user, "All user fetched successfully")
            )
        } else {
            return new ApiError(404, "No user found")
        }
    } catch (error) {
        console.error("Error fetching users: ", error);
        return new ApiError(500, "Internal server error while fetching users")
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json(
            new ApiError(400, "User ID is required")
        )
    }
    try {
        const user = await User.findById(userId)
            .select("-password -refreshToken")

        if (!user) {
            res.status(404).json(
                new ApiError(404, "user not found",)
            )
        }
        return res.status(200).json(
            new ApiResponse(200, user, "User fetched successfully")
        )
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json(
            new ApiError(500, "Internal server error while fetching user by ID")
        );
    }
})

const updateUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, userRole } = req.body
        if ([name, email, userRole].some(field => field?.trim() === "")) {
            throw new ApiError(400, "Please fill all the required fields")
        }
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    name,
                    email,
                    userRole
                }
            }, { new: true }
        )

        if (!updatedUser) {
            return new ApiError(404, "User not found")
        }

        return res
            .status(200)
            .json(new ApiResponse(200, [], "User updated successfully"))
    } catch (error) {
        console.error("Error updating user:", error);
        return new ApiError(500, "Internal server error while updating user");
    }
})

export {
    register,
    generateAccessTokenAndRefreshTokens,
    login,
    getAllUser,
    getUserById,
    updateUser
}