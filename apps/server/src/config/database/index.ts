import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { drizzle } from "drizzle-orm/aws-data-api/pg";

const rdsClient = new RDSDataClient({ region: process.env["AWS_RDS_REGION"]! });

const db = drizzle(rdsClient, {
  database: process.env["AWS_RDS_HOST"]!,
  secretArn: process.env["AWS_SECRET_ARN"]!,
  resourceArn: process.env["AWS_RDS_RESOURCE_ARN"]!,
});

export { db };
