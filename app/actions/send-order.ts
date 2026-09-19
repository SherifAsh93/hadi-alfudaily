"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";

export async function sendOrder(data: {
  name: string;
  phone: string;
  category: string;
  description: string;
}) {
  try {
    await db.insert(orders).values({
      name: data.name,
      phone: data.phone,
      category: data.category,
      description: data.description,
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, error: "Failed to save order" };
  }
}