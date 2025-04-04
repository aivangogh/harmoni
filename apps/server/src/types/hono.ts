import { type RouteConfig, type RouteHandler } from '@hono/zod-openapi';
import { type Session } from './auth';
import { db } from '@/config/database';

export type HonoEnv = {
  Variables: {
    session: Session | null;
    db: typeof db;
  };
};

export type AppRouteHandler<TRouteConfig extends RouteConfig> = RouteHandler<TRouteConfig, HonoEnv>;
