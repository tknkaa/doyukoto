import { getD1 } from "$lib/db";
import { users } from "$lib/db/schema";
import type { PageServerLoad  } from "./$types";

export const load: PageServerLoad = async({ platform }) => {
  if (!platform) {
    throw new Error("platform not found")
  }
  const db = getD1(platform);
  await db.insert(users).values({
    name: "John Doe",
    age: 50,
    email: "john.doe@utcode.net"
  })
  const currentUsers = await db.select().from(users);
  console.log(currentUsers)
}

