import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

export function getD1(platform: App.Platform) : DrizzleD1Database {
  const db = drizzle(platform.env.DB)
  return db
}
