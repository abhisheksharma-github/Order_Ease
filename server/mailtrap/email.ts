// email.ts
import { Resend } from 'resend';
import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = "OrderEase <no-reply@yourdomain.com>"; // replace with your verified domain

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    try {
        await resend.emails.send({
            from,
            to: email,
            subject: "Verify your email",
            html: htmlContent.replace("{verificationToken}", verificationToken),
        });
    } catch (error) {
    
        throw new Error("Failed to send verification email");
    }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    const html = generateWelcomeEmailHtml(name);
    try {
        await resend.emails.send({
            from,
            to: email,
            subject: "Welcome to OrderEase",
            html,
        });
    } catch (error) {
      
        throw new Error("Failed to send welcome email");
    }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const html = generatePasswordResetEmailHtml(resetURL);
    try {
        await resend.emails.send({
            from,
            to: email,
            subject: "Reset your password",
            html,
        });
    } catch (error) {
     
        throw new Error("Failed to send password reset email");
    }
};

export const sendResetSuccessEmail = async (email: string) => {
    const html = generateResetSuccessEmailHtml();
    try {
        await resend.emails.send({
            from,
            to: email,
            subject: "Password Reset Successful",
            html,
        });
    } catch (error) {
        
        throw new Error("Failed to send reset success email");
    }
};
