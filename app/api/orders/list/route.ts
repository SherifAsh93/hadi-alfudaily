import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
    return NextResponse.json({ success: true, data: allOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, data: [] });
  }
}