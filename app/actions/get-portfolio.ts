"use server";

import { db } from "@/db";
import { portfolio } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getPortfolio() {
  try {
    const items = await db
      .select()
      .from(portfolio)
      .orderBy(desc(portfolio.order), desc(portfolio.createdAt));
    return { success: true, data: items };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return { success: false, data: [] };
  }
}