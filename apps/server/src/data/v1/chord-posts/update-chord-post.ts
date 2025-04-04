import { db } from "@/config/database";
import { chordPosts } from "@/config/database/schema/chord-posts";
import { ChordPostUpdate } from "@/config/database/types/chord-posts";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";

export async function updateChordPostData(id: string, payload: ChordPostUpdate) {
  const record = await db.select().from(chordPosts).where(eq(chordPosts.id, id));

  if (!record || record.length === 0) {
    throw new NotFoundError("Chord post not found"); 
  }

  const updatedRecord = await db.update(chordPosts).set(payload).where(eq(chordPosts.id, id)).returning();

  return updatedRecord;
}
