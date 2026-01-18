import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // If it's a known ApiError, use its status and message
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            // Only show stack in development
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }

    // Handle Mongoose Validation Errors special case
    if (err.name === 'ValidationError') {
         const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
         return res.status(400).json({
            success: false,
            message: message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
         });
    }
    
    // Handle Mongoose Duplicate Key Error
    if (err.code && err.code === 11000) {
        const message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
        return res.status(400).json({
            success: false,
            message: message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }

    // Fallback for unhandled errors
    console.error("Unhandled Error:", err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
