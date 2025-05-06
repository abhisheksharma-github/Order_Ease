import {z} from "zod";

/**
 * Schema for user signup validation using Zod.
 * 
 * This schema validates the following fields:
 * - `fullname`: A required string with a minimum length of 1 character.
 * - `email`: A required string that must be a valid email address.
 * - `password`: A required string with a minimum length of 6 characters.
 * - `contact`: A required string that must be exactly 10 digits long.
 * 
 * Validation Rules:
 * - `fullname`: Throws an error if not provided.
 * - `email`: Throws an error if the email format is invalid.
 * - `password`: Throws an error if the password is less than 6 characters.
 * - `contact`: Throws an error if the contact number is not exactly 10 digits.
 */
export const userSignupSchema = z.object({
    fullname:z.string().min(1,"Fullname is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters."),
    contact:z.string().min(10,{message:"Contact number at least 10 digit"}).max(10,"Contact number at most 10 digit"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({ 
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters.") 
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
