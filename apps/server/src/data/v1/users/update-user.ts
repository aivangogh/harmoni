import { db } from "@/config/database";
import { users } from "@/config/database/schema/users";
import { UpdateUser } from "@/config/database/types/users";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export async function updateUserData(id: string, payload: UpdateUser) {
	const record = await db.select().from(users).where(eq(users.id, id));

	if (!record || record.length === 0) {
		throw new NotFoundError("User not found");
	}

	const updatedRecord = await db
		.update(users)
		.set(payload)
		.where(eq(users.id, id))
		.returning();

	return updatedRecord;
}
