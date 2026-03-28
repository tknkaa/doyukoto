import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export * from "./auth-schema";

export const rooms = sqliteTable("rooms", {
  id: text().primaryKey(),
  createdAt: int().notNull(),
});

export const roomMembers = sqliteTable("room_members", {
  roomId: text().notNull(),
  userId: text().notNull(),
});

export const messages = sqliteTable("messages", {
  id: text().primaryKey(),
  roomId: text().notNull(),
  fromUserId: text().notNull(),
  body: text().notNull(),
  createdAt: int().notNull(),
});
