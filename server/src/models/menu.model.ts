import mongoose, { Document } from "mongoose";

export interface IMenu {
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface IMenuDocument extends IMenu, Document {
    createdAt: Date;
    updatedAt: Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>({
    name: {
        type: String,
        required: [true, "Menu name is required"],
        trim: true,
        minlength: [1, "Menu name cannot be empty"],
        maxlength: [100, "Menu name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be positive"]
    },
    image: {
        type: String,
        required: [true, "Image URL is required"]
    },
}, { timestamps: true });

// Index for better search performance
menuSchema.index({ name: "text", description: "text" });

export const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);