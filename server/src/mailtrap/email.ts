import { Resend } from "resend";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL =
  process.env.NODE_ENV === "production"
    ? process.env.EMAIL_FROM! // example: noreply@yourdomain.com
    : "OrderEase <onboarding@resend.dev>";

const IS_DEV = process.env.NODE_ENV !== "production";

// 🔹 common send function
const sendEmail = async (to: string, subject: string, html: string) => {
  if (IS_DEV) {
    console.log("📧 DEV MODE EMAIL");
    console.log("To:", to);
    console.log("Subject:", subject);
    return;
  }

  if (!resend) {
    console.warn("Resend is not initialized. Email skipped.");
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Email sending failed");
  }
};

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const html = htmlContent.replace(
    "{verificationToken}",
    verificationToken
  );
  await sendEmail(email, "Verify your email", html);
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = generateWelcomeEmailHtml(name);
  await sendEmail(email, "Welcome to OrderEase", html);
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const html = generatePasswordResetEmailHtml(resetURL);
  await sendEmail(email, "Reset your password", html);
};

export const sendResetSuccessEmail = async (email: string) => {
  const html = generateResetSuccessEmailHtml();
  await sendEmail(email, "Password reset successful", html);
};
