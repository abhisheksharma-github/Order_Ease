import mongoose, { Document } from "mongoose";

type DeliveryDetails = {
    email: string;
    name: string;
    address: string;
    city: string;
}

type CartItems = {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    restaurant: mongoose.Schema.Types.ObjectId;
    deliveryDetails: DeliveryDetails,
    cartItems: CartItems[];
    totalAmount: number;
    status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, "Restaurant is required"],
        index: true
    },
    deliveryDetails: {
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
    },
    cartItems: [{
        menuId: {
            type: String,
            required: [true, "Menu ID is required"]
        },
        name: {
            type: String,
            required: [true, "Menu name is required"],
            trim: true
        },
        image: {
            type: String,
            required: [true, "Menu image is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be positive"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"]
        },
    }],
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total amount must be positive"]
    },
    status: {
        type: String,
        enum: {
            values: ["pending", "confirmed", "preparing", "outfordelivery", "delivered"],
            message: "Status must be one of: pending, confirmed, preparing, outfordelivery, delivered"
        },
        default: "pending",
        required: true
    }
}, { timestamps: true });

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, status: 1 });

export const Order = mongoose.model<IOrder>("Order", orderSchema);