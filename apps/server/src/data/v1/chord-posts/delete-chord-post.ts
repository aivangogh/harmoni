import { db } from "@/config/database";
import { chordPosts } from "@/config/database/schema/chord-posts";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export async function deleteChordPostData(id: string) {

  const record = await db.select().from(chordPosts).where(eq(chordPosts.id, id))

  if (!record || record.length === 0) {
    throw new NotFoundError("Chord post not found");
  }

  const deletedRecord = await db.delete(chordPosts).where(eq(chordPosts.id, id)).returning();

  return deletedRecord;
}
