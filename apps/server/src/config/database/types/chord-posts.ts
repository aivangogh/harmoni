import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { chordPosts } from "../schema/chord-posts";
import { z } from "@hono/zod-openapi";

export const chordPostSelectSchema = createSelectSchema(chordPosts);
export const chordPostInsertSchema = createInsertSchema(chordPosts).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export const chordPostUpdateSchema = createUpdateSchema(chordPosts)
	.partial()
	.omit({ id: true, createdAt: true, updatedAt: true });

export type ChordPost = z.infer<typeof chordPostSelectSchema>;
export type ChordPostInsert = z.infer<typeof chordPostInsertSchema>;
export type ChordPostUpdate = z.infer<typeof chordPostUpdateSchema>;
