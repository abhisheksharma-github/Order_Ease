import mongoose, { Document, Model } from "mongoose";

export interface IUser {
    fullname: string;
    email: string;
    password: string;
    contact: number;
    address?: string;
    city?: string;
    country?: string;
    profilePicture?: string;
    admin?: boolean;
    lastLogin?: Date;
    isVerified?: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpiresAt?: Date;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    contact: {
        type: Number,
        required: [true, "Contact number is required"],
        validate: {
            validator: function(v: number) {
                return v.toString().length >= 10 && v.toString().length <= 15;
            },
            message: "Contact number must be between 10 and 15 digits"
        }
    },
    address: {
        type: String,
        default: "Update your address"
    },
    city: {
        type: String,
        default: "Update your city"
    },
    country: {
        type: String,
        default: "Update your country"
    },
    profilePicture: {
        type: String,
        default: ""
    },
    admin: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTokenExpiresAt: {
        type: Date
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiresAt: {
        type: Date
    }
}, { timestamps: true });

// Indexes for better query performance
// userSchema.index({ email: 1 }); // Removed to prevent duplicate index warning
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ verificationToken: 1 });

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);
