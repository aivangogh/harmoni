import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { favorites } from "../schema/favorites";
import { z } from "@hono/zod-openapi";

export const favoriteSelectSchema = createSelectSchema(favorites);
export const favoriteInsertSchema = createInsertSchema(favorites).omit({
	id: true,
	createdAt: true,
});
export const favoriteUpdateSchema = createUpdateSchema(favorites)
	.partial()
	.omit({ id: true, createdAt: true });

export type Favorite = z.infer<typeof favoriteSelectSchema>;
export type FavoriteInsert = z.infer<typeof favoriteInsertSchema>;
export type FavoriteUpdate = z.infer<typeof favoriteUpdateSchema>;
