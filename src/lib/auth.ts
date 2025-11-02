import ConfirmEmail from "@/components/email/verify-otp-template";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true, // ✅ Enable password authentication
    requireEmailVerification: true, // ✅ Require email verification before login
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      sendVerificationOnSignUp: true,

      async sendVerificationOTP({ email, otp, type }) {
        const subjectMap = {
          "sign-in": "Sign in to your account",
          "email-verification": "Verify your email address",
          "forget-password": "Reset your password",
        };

        try {
          await resend.emails.send({
            from: "Subhraneel <no-reply@poplu.store>",
            to: email,
            subject: subjectMap[type],
            react: ConfirmEmail({
              validationCode: otp,
            }),
          });
        } catch (error) {
          console.error("Resend email error:", error);
          throw new Error("Failed to send OTP email");
        }
      },
    }),
  ],
});
