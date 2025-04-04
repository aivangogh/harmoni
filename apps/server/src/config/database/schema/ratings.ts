
import * as t from "drizzle-orm/pg-core";
import { chordPosts } from "./chord-posts";
import { users } from "./users";

export const ratings = t.pgTable(
	"ratings",
	{
		id: t.uuid("id").primaryKey().notNull(),
    postId: t.uuid("post_id").references(() => chordPosts.id).notNull(),
    userId: t.uuid("user_id").references(() => users.id).notNull(),
    rating: t.smallint("rating").notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
	},
);
