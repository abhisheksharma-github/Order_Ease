import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing");
}

const resend = new Resend(RESEND_API_KEY);

const IS_DEV = process.env.NODE_ENV !== "production";

// ✅ sender logic (THIS IS IMPORTANT)
export const sender = {
  name: "OrderEase",
  email: IS_DEV
    ? "onboarding@resend.dev" // works only for your own email
    : process.env.EMAIL_FROM!, // must be verified domain
};

// ✅ single safe email function
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  // DEV MODE → log only (no crash)
  if (IS_DEV) {
    console.log("📧 DEV EMAIL");
    console.log("To:", to);
    console.log("Subject:", subject);
    return;
  }

  const { error } = await resend.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Email sending failed");
  }
};
