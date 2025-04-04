
import * as t from "drizzle-orm/pg-core";
import { chordPosts } from "./chord-posts";
import { users } from "./users";

export const contributionType = t.pgEnum("contribution_type", ["add", "edit", "correction", "suggestion"]);

export const contributors = t.pgTable(
	"contributors",
	{
		id: t.uuid("id").primaryKey().notNull(),
    postId: t.uuid("post_id").references(() => chordPosts.id).notNull(),
    userId: t.uuid("user_id").references(() => users.id).notNull(),
    contributionType: contributionType("contribution_type").notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
	},
);
