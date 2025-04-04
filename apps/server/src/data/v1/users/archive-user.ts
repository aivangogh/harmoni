import { db } from "@/config/database";
import { users } from "@/config/database/schema/users";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export async function archiveUserData(id: string) {
	const record = await db.select().from(users).where(eq(users.id, id));

  if (!record || record.length === 0) {
    throw new NotFoundError("User not found"); 
  }

  const archivedRecord = await db
    .update(users)
    .set({ deletedAt: new Date() })
    .where(eq(users.id, id))
    .returning();

	return archivedRecord;
}
