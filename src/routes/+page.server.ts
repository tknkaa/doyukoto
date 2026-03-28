import { users } from '$lib/db/schema';
import { db } from '$lib/db';

export const load = async () => {
	const result = await db.select().from(users);
	console.log(result);
};
