import { NextResponse } from "next/server";
import { Resend } from "resend";
import ConfirmEmail from "@/components/email/verify-otp-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Subhraneel <no-reply@yourdomain.com>",
      to: [email],
      subject: "Your Email Verification Code",
      react: ConfirmEmail({ validationCode: otp }),
    });

    if (error) {
      console.error("Email send error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
