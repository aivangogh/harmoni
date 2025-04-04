import { userSchema, userSchemaFields, userSchemaOpenApi } from "@/config/database/types/users";
import { getUsersData } from "@/data/v1/users/get-users";
import { type AppRouteHandler } from "@/types/hono";
import { listQuerySchema, paginationSchema } from "@/utils/zod-schemas";
import { createRoute, z } from "@hono/zod-openapi";
import { Context } from "hono";
import { StatusCodes } from "http-status-codes";

export const getUsersSchema = {
  query: listQuerySchema.extend({
    sort_by: userSchemaFields.optional(),
  }),
  response: paginationSchema.extend({
    records: z.array(userSchemaOpenApi),
    total_records: z.number(),
  }),
};

export type GetUsersQuery = z.infer<typeof getUsersSchema.query>;
export type GetUsersResponse = z.infer<typeof getUsersSchema.response>;

export const getUsersRoute = createRoute({
  middleware: [],
  security: [{ bearerAuth: [] }],
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List all users',
  description: 'Retrieve a list of all users.',
  request: {
    query: getUsersSchema.query,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: getUsersSchema.response,
        },
      },
      description: 'Users retrieved successfully',
    },
  },
});

export const getUsersRouteHandler = async (c: Context) => {

  const users = await getUsersData();

  return c.json(users, StatusCodes.OK);
};
