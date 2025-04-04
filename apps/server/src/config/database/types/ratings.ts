import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { ratings } from "../schema/ratings";
import { z } from "@hono/zod-openapi";

export const ratingSelectSchema = createSelectSchema(ratings);
export const ratingInsertSchema = createInsertSchema(ratings).omit({
	id: true,
	createdAt: true,
  updatedAt: true,
});
export const ratingUpdateSchema = createUpdateSchema(ratings)
	.partial()
	.omit({ id: true, createdAt: true, updatedAt: true });

export type Rating = z.infer<typeof ratingSelectSchema>;
export type RatingInsert = z.infer<typeof ratingInsertSchema>;
export type RatingUpdate = z.infer<typeof ratingUpdateSchema>;
