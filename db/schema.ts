import { serial, varchar, text, timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 10 }).notNull(), // "image" | "video"
  url: varchar("url", { length: 500 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});