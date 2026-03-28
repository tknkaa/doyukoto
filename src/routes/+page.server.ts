import { rooms } from '$lib/db/schema';
import { db } from '$lib/db';

export const load = async () => {
	const result = await db.select().from(rooms);
	console.log(result);
};
