import { defineConfig } from "drizzle-kit";
import { envConfig } from "./src/env";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/config/database/schema",
	out: "./drizzle",
	dbCredentials: {
    host: envConfig.AWS_RDS_HOST,
    user: envConfig.AWS_RDS_USERNAME,
    password: envConfig.AWS_RDS_PASSWORD,
    database: envConfig.AWS_RDS_DATABASE,
    ssl: { rejectUnauthorized: false },
	},
});
