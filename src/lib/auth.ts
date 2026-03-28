import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { username } from 'better-auth/plugins';
import * as schema from '$lib/db/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			...schema
		}
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [username()]
});
