import { db } from "@/config/database";
import { users } from "@/config/database/schema/users";
import { CreateUser } from "@/config/database/types/users";
import { ConflictError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export async function createUserData(payload: CreateUser) {
	const record = await db.select().from(users).where(eq(users.email, payload.email));

	if (record && record.length !== 0) {
		throw new ConflictError("User already exists");
	}

  const createdRecord = await db.insert(users).values(payload).returning();

	return createdRecord;
}
