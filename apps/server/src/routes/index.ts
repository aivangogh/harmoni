import { Hono } from "hono"
import v1Route from "./v1"

const router = new Hono();

router.route("/v1", v1Route);

export default router
