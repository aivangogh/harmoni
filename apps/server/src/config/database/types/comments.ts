import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { comments } from "../schema/comments";
import { z } from "@hono/zod-openapi";

export const commentsSelectSchema = createSelectSchema(comments);
export const commentsInsertSchema = createInsertSchema(comments).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export const commentsUpdateSchema = createUpdateSchema(comments)
	.partial()
	.omit({ id: true, createdAt: true, updatedAt: true });

export type Comment = z.infer<typeof commentsSelectSchema>;
export type CommentInsert = z.infer<typeof commentsInsertSchema>;
export type CommentUpdate = z.infer<typeof commentsUpdateSchema>;
