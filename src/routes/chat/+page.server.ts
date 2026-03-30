import { db } from '$lib/db';
import { roomMembers, rooms, user } from '$lib/db/schema';
import type { PageServerLoad } from './$types';
import { eq, ne } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const currentUserId = locals.user?.id;
	if (!currentUserId) {
		return { rooms: [] };
	} else {
		const myRooms = await db
			.select()
			.from(rooms)
			.innerJoin(roomMembers, eq(rooms.id, roomMembers.roomId))
			.where(eq(roomMembers.userId, currentUserId));
		const users = await db.select().from(user).where(ne(user.id, currentUserId));
		return { rooms: myRooms, users: users };
	}
};
