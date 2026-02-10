import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { generateVerificationCode, sendVerificationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Please provide email" },
        { status: 400 },
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already verified
    if (user.isVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 },
      );
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new code
    user.verificationCode = verificationCode;
    user.verificationCodeExpire = verificationCodeExpire;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, user.name, verificationCode);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "New verification code sent to your email",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resend code error:", error);
    return NextResponse.json(
      { error: "Server error while resending code" },
      { status: 500 },
    );
  }
}
