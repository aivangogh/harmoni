import { z } from "@hono/zod-openapi";
import { createSchemaFactory } from "drizzle-zod";
import { users } from "../schema/users";

const { createSelectSchema } =
	createSchemaFactory({ zodInstance: z });

export const userSchemaObject = createSelectSchema(users, {
	id: (schema) => schema.openapi({ example: crypto.randomUUID() }),
	firstName: (schema) => schema.openapi({ example: "John" }),
	lastName: (schema) => schema.openapi({ example: "Doe" }),
	email: (schema) => schema.openapi({ example: "7aE0I@example.com" }),
	createdAt: (schema) => schema.openapi({ example: new Date().toISOString() }),
	updatedAt: (schema) => schema.openapi({ example: new Date().toISOString() }),
	deletedAt: (schema) => schema.openapi({ example: new Date().toISOString() }),
});

export type User = z.infer<typeof userSchemaObject>;
export type CreateUser = Omit<
	User,
	"id" | "createdAt" | "updatedAt" | "deletedAt"
>;
export type UpdateUser = Partial<User>;

export const userSchema = z.object(
	userSchemaObject.shape,
) satisfies z.ZodType<User>;
export const userSchemaOpenApi = userSchema.openapi("User");
export const userSchemaFields = z.enum(
	Object.keys(userSchemaObject.shape) as [string, ...string[]],
);
