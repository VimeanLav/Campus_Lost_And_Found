import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LostItem from "@/models/LostItem";

// GET all lost items
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "active";
    const userId = searchParams.get("userId");

    // Build query
    let query = {};
    if (category && category !== "all") {
      query.category = category;
    }
    if (status && status !== "all") {
      query.status = status;
    }
    if (userId) {
      query.userId = userId;
    }

    const items = await LostItem.find(query).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching lost items:", error);
    return NextResponse.json(
      { error: "Failed to fetch lost items" },
      { status: 500 },
    );
  }
}

// POST create new lost item report
export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    // Validate required fields
    const {
      title,
      description,
      category,
      location,
      dateLost,
      userId,
      userName,
      userEmail,
    } = data;

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !dateLost ||
      !userId ||
      !userName ||
      !userEmail
    ) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 },
      );
    }

    const lostItem = await LostItem.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Lost item report created successfully",
        data: lostItem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating lost item:", error);
    console.error("Error details:", error.message);
    if (error.errors) {
      console.error("Validation errors:", error.errors);
    }
    return NextResponse.json(
      {
        error: "Failed to create lost item report",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
