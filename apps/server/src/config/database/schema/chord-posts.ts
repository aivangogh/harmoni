import * as t from "drizzle-orm/pg-core";
import { songs } from "./songs";
import { users } from "./users";

export const postTypes = t.pgEnum("types", ["chords", "tabs"]);
export const diffeculty = t.pgEnum("difficulty", [
	"beginner",
	"intermediate",
	"advanced",
]);

export const chordPosts = t.pgTable(
	"chord_posts",
	{
		id: t.uuid("id").primaryKey().notNull(),
		songId: t
			.uuid("song_id")
			.references(() => songs.id)
			.notNull(),
		userId: t
			.uuid("user_id")
			.references(() => users.id)
			.notNull(),
		content: t.varchar("content", { length: 2500 }).notNull(),
		type: postTypes("type").notNull(),
		difficulty: diffeculty("difficulty").notNull(),
		tuning: t.varchar("tuning", { length: 256 }).notNull(),
		key: t.varchar("key", { length: 256 }).notNull(),
		capo: t.integer("capo").default(0).notNull(),
		views: t.integer("views").default(0).notNull(),
		createdAt: t.timestamp("created_at").defaultNow().notNull(),
		updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
		deletedAt: t.timestamp("deleted_at"),
	},
	(table) => [
		t.index("song_id_idx").on(table.songId),
		t.index("user_id_idx").on(table.userId),
	],
);
