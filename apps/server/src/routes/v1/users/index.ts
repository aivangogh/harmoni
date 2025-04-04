import {
  getUserRoute,
  getUserRouteHandler,
} from "@/controllers/v1/users/get-user";
import {
  getUsersRoute,
  getUsersRouteHandler,
} from "@/controllers/v1/users/get-users";
import { type HonoEnv } from "@/types/hono";
import { OpenAPIHono } from "@hono/zod-openapi";

const router = new OpenAPIHono<HonoEnv>()
	.openapi(getUserRoute, getUserRouteHandler)
	.openapi(getUsersRoute, getUsersRouteHandler);

export default router;
