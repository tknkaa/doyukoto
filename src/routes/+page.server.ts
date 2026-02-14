import { drizzle } from "drizzle-orm/d1";

import type { PageServerLoad  } from "./$types";

export const load: PageServerLoad = async({ platform }) => {
  const db = drizzle(platform?.env.DB)
}

