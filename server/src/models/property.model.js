import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        propertyName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        rooms: {
            type: Number,
            required: true,
            min: 1
        },
        propertyType: {
            type: String,
            required: true,
            enum: ['apartment', 'house', 'commercial', 'land'],
            lowercase: true,
            trim: true,
        },
        rent: {
            type: Number,
            required: true,
            min: 0
        },
        location: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        propertyImage: {
            type: String,
            required: false,
            default: '' // Placeholder image URL
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
    }, { timestamps: true }
)

export const Property = mongoose.model("Property", propertySchema)