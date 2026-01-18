import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const channel = process.env.TWILIO_CHANNEL || "sms";

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export const sendVerificationCode = async (phoneNumber: string) => {
    if (!client || !serviceSid) {
        console.warn("Twilio client not initialized. Skipping SMS/WhatsApp.");
        return null;
    }

    try {
        // For WhatsApp, Twilio expects 'whatsapp:+1234567890'
        const formattedNumber = channel === "whatsapp" && !phoneNumber.startsWith("whatsapp:") 
            ? `whatsapp:${phoneNumber}` 
            : phoneNumber;

        const verification = await client.verify.v2.services(serviceSid)
            .verifications
            .create({ to: formattedNumber, channel: channel as any });
        
        console.log(`Verification sent to ${formattedNumber}: ${verification.sid}`);
        return verification;
    } catch (error) {
        console.error("Twilio send error:", error);
        throw error;
    }
};

export const checkVerificationCode = async (phoneNumber: string, code: string) => {
    if (!client || !serviceSid) {
        throw new Error("Twilio client not initialized.");
    }

    try {
        const formattedNumber = channel === "whatsapp" && !phoneNumber.startsWith("whatsapp:") 
            ? `whatsapp:${phoneNumber}` 
            : phoneNumber;

        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: formattedNumber, code });
        
        return verificationCheck.status === "approved";
    } catch (error) {
        console.error("Twilio check error:", error);
        throw error;
    }
};
