import * as t from "drizzle-orm/pg-core";


export const users = t.pgTable(
	"users",
	{
		id: t.uuid("id").primaryKey().notNull(),
		firstName: t.varchar("first_name", { length: 256 }),
		lastName: t.varchar("last_name", { length: 256 }),
		email: t.varchar("email", { length: 256 }).notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
    deletedAt: t.timestamp("deleted_at"),
	},
	(table) => [t.uniqueIndex("email_idx").on(table.email)],
);
