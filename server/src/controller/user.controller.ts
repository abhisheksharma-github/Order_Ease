import { Request, Response } from "express";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

// Extend Express Request interface to include 'id'
declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}
import bcrypt from "bcryptjs";
import * as crypto from 'node:crypto';
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";
import { sendVerificationCode, checkVerificationCode } from "../utils/twillio";

export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { fullname, email, password, contact } = req.body;

    // Input validation
    if (!fullname || !email || !password || !contact) {
        throw new ApiError(400, "All fields are required: fullname, email, password, contact");
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }

    let user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exist with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();

    user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        contact: Number(contact),
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    generateToken(res, user);

    // Generate phone number with country code for Twilio (assuming +91 if not provided)
    const phoneNumber = contact.toString().startsWith("+") ? contact.toString() : `+91${contact}`;

    try {
        await sendVerificationCode(phoneNumber);
    } catch (twilioError: any) {
        console.error("Twilio sending error:", twilioError);
        
        if (process.env.NODE_ENV !== 'development') {
            await User.deleteOne({ email });
            throw new ApiError(500, "Failed to send verification code. Please try again later.");
        }
    }

    const userWithoutPassword = await User.findOne({ email }).select("-password");

    return res.status(201).json({
        success: true,
        message: "Account created successfully. Verification code sent.",
        user: userWithoutPassword
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Incorrect email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(400, "Incorrect email or password");
    }

    generateToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    // send user without password
    const userWithoutPassword = await User.findOne({ email }).select("-password");

    return res.status(200).json({
        success: true,
        message: `Welcome back ${user.fullname}`,
        user: userWithoutPassword
    });
});
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { verificationCode, email } = req.body;

    if (!verificationCode || !email) {
        throw new ApiError(400, "Verification code and email are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const phoneNumber = user.contact.toString().startsWith("+") ? user.contact.toString() : `+91${user.contact}`;
    
    const isVerified = await checkVerificationCode(phoneNumber, verificationCode);

    if (!isVerified) {
        throw new ApiError(400, "Invalid or expired verification code");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email (optional, can stay as email)
    try {
        await sendWelcomeEmail(user.email, user.fullname);
    } catch (emailError) {
        console.error("Welcome email error:", emailError);
    }

    return res.status(200).json({
        success: true,
        message: "Account verified successfully.",
        user,
    });
});
export const logout = asyncHandler(async (_: Request, res: Response) => {
    return res.clearCookie("token", {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    }).status(200).json({
        success: true,
        message: "Logged out successfully."
    });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        // Don't reveal if user exists for security
        return res.status(200).json({
            success: true,
            message: "If an account exists with this email, a password reset link has been sent"
        });
    }

    const resetToken = crypto.randomBytes(40).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email
    try {
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);
    } catch (emailError) {
        console.error("Password reset email error:", emailError);
        throw new ApiError(500, "Failed to send password reset email. Please try again later.");
    }

    return res.status(200).json({
        success: true,
        message: "Password reset link sent to your email"
    });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
        throw new ApiError(400, "Reset token is required");
    }

    if (!newPassword || newPassword.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired reset token");
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // send success reset email
    try {
        await sendResetSuccessEmail(user.email);
    } catch (emailError) {
        console.error("Reset success email error:", emailError);
        // Don't fail if email fails
    }

    return res.status(200).json({
        success: true,
        message: "Password reset successfully."
    });
});
export const checkAuth = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.id;

    if (!userId) {
        throw new ApiError(401, 'User not authenticated');
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    return res.status(200).json({
        success: true,
        user
    });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } = req.body;

    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    const updatedData: any = {};
    if (fullname) updatedData.fullname = fullname;
    if (email) updatedData.email = email;
    if (address) updatedData.address = address;
    if (city) updatedData.city = city;
    if (country) updatedData.country = country;

    // Upload image on cloudinary if provided
    if (profilePicture) {
        try {
            const cloudResponse = await cloudinary.uploader.upload(profilePicture);
            updatedData.profilePicture = cloudResponse.secure_url;
        } catch (cloudError) {
            console.error("Cloudinary upload error:", cloudError);
            throw new ApiError(500, "Failed to upload profile picture");
        }
    }

    // Check if email is being changed and if it's already taken
    if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
            throw new ApiError(400, "Email is already in use");
        }
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true }).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
        success: true,
        user,
        message: "Profile updated successfully"
    });
});
