import { userSchemaOpenApi } from "@/config/database/types/users";
import { getUserData } from "@/data/v1/users/get-user";
import { type AppRouteHandler } from "@/types/hono";
import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";

export const getUserSchema = {
	params: z.object({
		userId: z
			.string()
			.uuid()
			.openapi({
				param: { name: "user_id", in: "path" },
				example: crypto.randomUUID(),
			}),
	}),
	response: userSchemaOpenApi,
};

export type GetUserParams = z.infer<typeof getUserSchema.params>;
export type GetUserResponse = z.infer<typeof getUserSchema.response>;

export const getUserRoute = createRoute({
	middleware: [],
	security: [{ bearerAuth: [] }],
	method: "get",
	path: "/users/{user_id}",
	tags: ["Users"],
	summary: "Retrieve a user",
	description: "Retrieve the details of a user.",
	request: {
		params: getUserSchema.params,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: getUserSchema.response,
				},
			},
			description: "User retrieved successfully",
		},
	},
});

export const getUserRouteHandler: AppRouteHandler<typeof getUserRoute> = async (
	c,
) => {
	const param = c.req.valid("param");

	const user = await getUserData(param.userId);

	return c.json(user, StatusCodes.OK);
};
