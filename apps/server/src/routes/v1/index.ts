
import { Hono } from "hono"
import usersRoute from "./users"

const router = new Hono();

router.route("/users", usersRoute);

export default router
