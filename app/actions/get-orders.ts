"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getOrders() {
  try {
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
    return { success: true, data: allOrders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, data: [] };
  }
}