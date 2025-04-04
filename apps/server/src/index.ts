import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { version } from '../package.json';

import routes from "./routes";
import { envConfig } from "./env";
import { OpenAPIHono } from "@hono/zod-openapi";
import { HonoEnv } from "./types/hono";
import { schemas } from "./data/v1/schema";
import { swaggerUI } from "@hono/swagger-ui";
import { apiReference } from "@scalar/hono-api-reference";
import { errorHandlerMiddleware } from "./middlewares/error-handler";

const app = new OpenAPIHono<HonoEnv>();

/* API Docs */
app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    version,
    title: `${envConfig.STAGE.toUpperCase()} API`,
    description: 'API Documentation',
  },
  externalDocs: {
    description: 'API Reference',
    url: '/reference',
  },
});
app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

/* Register Schemas */
Object.entries(schemas).forEach(([key, value]) => {
  app.openAPIRegistry.register(key, value);
});

/* API Docs */
app.get('/swagger', swaggerUI({ url: '/openapi.json' }));
app.get('/reference', apiReference({ url: '/openapi.json' }));

// Middlewares
app.onError(errorHandlerMiddleware);
app.use("*", cors());
app.use(logger());
app.use(prettyJSON());

// Routes
app.route("/", routes);

export const handler = handle(app);

export default {
  port: process.env.PORT || 4000,
  fetch: app.fetch,
};
