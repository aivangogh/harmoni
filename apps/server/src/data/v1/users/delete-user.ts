import { db } from "@/config/database";
import { users } from "@/config/database/schema/users";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export async function deleteUserData(id: string) {
	const record = await db.select().from(users).where(eq(users.id, id));

  if (!record || record.length === 0) {
    throw new NotFoundError("User not found"); 
  }

  const deletedRecord = await db.delete(users).where(eq(users.id, id)).returning();

	return deletedRecord;
}
