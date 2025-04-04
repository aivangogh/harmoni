import { db } from "@/config/database";
import { users } from "@/config/database/schema/users";
import { NotFoundError } from "@/utils/errors";

export async function getUsersData() {
  const records = await db.select().from(users)

  if (!records || records.length === 0) {
    throw new NotFoundError("Users not found");
  }

  return records
}
