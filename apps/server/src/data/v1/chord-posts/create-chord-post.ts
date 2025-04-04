import { db } from "@/config/database";
import { chordPosts } from "@/config/database/schema/chord-posts";
import { ChordPostInsert } from "@/config/database/types/chord-posts";

export async function createChordPostData(payload: ChordPostInsert) {
  const record = await db.insert(chordPosts).values(payload).returning();

  return record;
}
