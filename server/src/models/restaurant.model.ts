import mongoose, { Document } from "mongoose";

export interface IRestaurant {
    user: mongoose.Schema.Types.ObjectId;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    imageUrl: string;
    menus: mongoose.Schema.Types.ObjectId[];
}

export interface IRestaurantDocument extends IRestaurant, Document {
    createdAt: Date;
    updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        unique: true,
        // index: true // redundant because unique: true creates an index
    },
    restaurantName: {
        type: String,
        required: [true, "Restaurant name is required"],
        trim: true,
        minlength: [1, "Restaurant name cannot be empty"],
        maxlength: [100, "Restaurant name cannot exceed 100 characters"]
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        index: true
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
        index: true
    },
    deliveryTime: {
        type: Number,
        required: [true, "Delivery time is required"],
        min: [0, "Delivery time must be positive"]
    },
    cuisines: [{
        type: String,
        required: [true, "At least one cuisine is required"],
        trim: true
    }],
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    imageUrl: {
        type: String,
        required: [true, "Image URL is required"]
    }
}, { timestamps: true });

// Indexes for better search performance
restaurantSchema.index({ restaurantName: "text", city: "text", country: "text" });
restaurantSchema.index({ cuisines: 1 });

export const Restaurant = mongoose.model<IRestaurantDocument>("Restaurant", restaurantSchema);