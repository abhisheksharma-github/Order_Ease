import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is missing in environment variables");
}

const resend = new Resend(resendApiKey);

export const client = {
  emails: {
    send: async (options: {
      from: string;
      to: string[];
      subject: string;
      html: string;
    }) => {
      try {
        const response = await resend.emails.send({
          from: options.from,
          to: options.to,
          subject: options.subject,
          html: options.html,
        });

        if (response.error) {
       
          throw new Error("Failed to send email via Resend");
        }

        return response;
      } catch (error) {
      
        throw error;
      }
    },
  },
};

export const sender = {
  name: "OrderEase",
  email: "no-reply@orderease.com", // ✅ Must be verified in Resend
};
