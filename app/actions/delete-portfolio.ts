"use server";

import { db } from "@/db";
import { portfolio } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deletePortfolioItem(id: number) {
  try {
    await db.delete(portfolio).where(eq(portfolio.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return { success: false, error: "Failed to delete item" };
  }
}