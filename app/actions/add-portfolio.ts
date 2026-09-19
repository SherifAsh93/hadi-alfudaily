"use server";

import { db } from "@/db";
import { portfolio } from "@/db/schema";

export async function addPortfolioItem(data: {
  title: string;
  description?: string;
  type: string;
  url: string;
  category: string;
  order?: number;
}) {
  try {
    await db.insert(portfolio).values({
      title: data.title,
      description: data.description,
      type: data.type,
      url: data.url,
      category: data.category,
      order: data.order || 0,
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    return { success: false, error: "Failed to add item" };
  }
}