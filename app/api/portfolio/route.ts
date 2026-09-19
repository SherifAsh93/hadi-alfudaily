import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { portfolio } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db
      .select()
      .from(portfolio)
      .orderBy(desc(portfolio.order), desc(portfolio.createdAt));
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, type, url, category, order } = body;

    if (!title || !type || !url || !category) {
      return NextResponse.json(
        { error: "Title, type, url, and category are required" },
        { status: 400 }
      );
    }

    await db.insert(portfolio).values({
      title,
      description: description || null,
      type,
      url,
      category,
      order: order || 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    return NextResponse.json(
      { error: "Failed to add item" },
      { status: 500 }
    );
  }
}