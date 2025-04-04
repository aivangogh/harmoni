import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { contributors } from "../schema/contributors";
import { z } from "@hono/zod-openapi";

export const contributorSelectSchema = createSelectSchema(contributors);
export const contributorInsertSchema = createInsertSchema(contributors).omit({
	id: true,
	createdAt: true,
});
export const contributorUpdateSchema = createUpdateSchema(contributors)
	.partial()
	.omit({ id: true, createdAt: true });

export type Contributor = z.infer<typeof contributorSelectSchema>;
export type ContributorInsert = z.infer<typeof contributorInsertSchema>;
export type ContributorUpdate = z.infer<typeof contributorUpdateSchema>;
