import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FoundItem from "@/models/FoundItem";

// GET all found items
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

    const items = await FoundItem.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching found items:", error);
    return NextResponse.json(
      { error: "Failed to fetch found items" },
      { status: 500 },
    );
  }
}

// POST create new found item report
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
      dateFound,
      userId,
      userName,
      userEmail,
    } = data;

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !dateFound ||
      !userId ||
      !userName ||
      !userEmail
    ) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 },
      );
    }

    const foundItem = await FoundItem.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Found item report created successfully",
        data: foundItem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating found item:", error);
    return NextResponse.json(
      { error: "Failed to create found item report" },
      { status: 500 },
    );
  }
}
