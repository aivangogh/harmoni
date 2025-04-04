import * as t from "drizzle-orm/pg-core";

export const songs = t.pgTable(
  "songs",
  {
		id: t.uuid("id").primaryKey().notNull(),
    title: t.varchar("title", { length: 256 }).notNull(),
    artist: t.varchar("artist", { length: 256 }).notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [t.index("title_idx").on(table.title)],
);

