import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const apiToken = process.env.MAILTRAP_API_TOKEN;
if (!apiToken) {
    throw new Error("MAILTRAP_API_TOKEN is missing in environment variables");
}

export const client = new MailtrapClient({
    token: apiToken // ✅ Do NOT add custom endpoint
});

export const sender = {
    email: "hello@demomailtrap.com", // ✅ Must be a verified sender in Mailtrap
    name: "OrderEase"
};
