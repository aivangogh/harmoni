import { userSchemaOpenApi } from "@/config/database/types/users";

export const schemas = {
  User: userSchemaOpenApi,
} as const;
