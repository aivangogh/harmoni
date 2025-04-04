import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { songs } from "../schema/songs";
import { z } from "@hono/zod-openapi";

export const songSelectSchema = createSelectSchema(songs);
export const songInsertSchema = createInsertSchema(songs).omit({
	id: true,
	createdAt: true,
  updatedAt: true,
});
export const songUpdateSchema = createUpdateSchema(songs)
	.partial()
	.omit({ id: true, createdAt: true, updatedAt: true });

export type Song = z.infer<typeof songSelectSchema>;
export type SongInsert = z.infer<typeof songInsertSchema>;
export type SongUpdate = z.infer<typeof songUpdateSchema>;
