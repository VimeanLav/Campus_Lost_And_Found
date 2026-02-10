import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    // Attempt to connect to MongoDB
    await connectDB();

    // Check connection status
    const dbState = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    if (dbState === 1) {
      return NextResponse.json(
        {
          success: true,
          message: "✅ MongoDB connected successfully!",
          details: {
            status: states[dbState],
            database: mongoose.connection.name,
            host: mongoose.connection.host,
          },
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "⚠️ MongoDB connection issue",
          details: {
            status: states[dbState],
          },
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "❌ Failed to connect to MongoDB",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
