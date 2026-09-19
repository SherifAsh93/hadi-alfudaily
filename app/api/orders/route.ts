import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, category, description } = body;

    if (!name || !phone || !category) {
      return NextResponse.json(
        { error: "Name, phone, and category are required" },
        { status: 400 }
      );
    }

    await db.insert(orders).values({
      name,
      phone,
      category,
      description: description || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}