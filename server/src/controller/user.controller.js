import { User } from "../models/user.models.js"
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
    const { userName, email, password } = req.body

    if (
        [email, userName, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"))
    }

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existingUser) {
        return res.status(409).json(new ApiResponse(409, "User with email or username is already exists"))
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
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
    if (!email && !password) {
        return res.status(400).json(new ApiResponse(400, "Username and email is required"))
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

export {
    register,
    generateAccessTokenAndRefreshTokens,
    login
}