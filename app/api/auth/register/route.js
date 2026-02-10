import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { generateVerificationCode, sendVerificationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 },
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpire,
      isVerified: false,
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, name, verificationCode);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Delete the user if email fails
      await User.findByIdAndDelete(user._id);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 },
      );
    }

    // Return success (don't send password back)
    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful! Please check your email for verification code.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Server error during registration" },
      { status: 500 },
    );
  }
}
