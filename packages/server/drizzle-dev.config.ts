import { defineConfig } from "drizzle-kit";

// I don't think this is the right way to use drizzle kit for local dev...
// but in GitHub, someone suggested this
// https://github.com/drizzle-team/drizzle-orm/discussions/1545#discussioncomment-11103230
export default {
	dialect: "sqlite",
	out: "drizzle",
	schema: "./src/schema.ts",
	dbCredentials: {
		url: "./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/0e088bf30645fb44db1952dac711c7c7e907528d6e86814072065f99f45b4e09.sqlite",
	},
};
