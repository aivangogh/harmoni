import { config } from 'dotenv';
import { z } from 'zod';
import { STAGES } from './constants/env';

config();

export function isTest() {
  return process.env.NODE_ENV === 'test';
}

const envSchema = z.object({
  APP_PORT: z.coerce.number().default(4000),
  STAGE: z.nativeEnum(STAGES).default(STAGES.Dev),
  AWS_RDS_REGION: z.string(),
  AWS_RDS_HOST: z.string(),
  AWS_RDS_DATABASE: z.string(),
  AWS_RDS_SECRET_ARN: z.string(),
  AWS_RDS_PORT: z.coerce.number().default(5432),
  AWS_RDS_RESOURCE_ARN: z.string(),
  AWS_RDS_USERNAME: z.string(),
  AWS_RDS_PASSWORD: z.string(),
});

export const envConfig = envSchema.parse({
  APP_PORT: process.env.APP_PORT,
  STAGE: process.env.STAGE,
  AWS_RDS_REGION: process.env.AWS_RDS_REGION,
  AWS_RDS_HOST: process.env.AWS_RDS_HOST,
  AWS_RDS_PORT: process.env.AWS_RDS_PORT,
  AWS_RDS_DATABASE: process.env.AWS_RDS_DATABASE,
  AWS_RDS_SECRET_ARN: process.env.AWS_RDS_SECRET_ARN,
  AWS_RDS_RESOURCE_ARN: process.env.AWS_RDS_RESOURCE_ARN,
  AWS_RDS_USERNAME: process.env.AWS_RDS_USERNAME,
  AWS_RDS_PASSWORD: process.env.AWS_RDS_PASSWORD,
});

export type EnvConfig = z.infer<typeof envSchema>;
