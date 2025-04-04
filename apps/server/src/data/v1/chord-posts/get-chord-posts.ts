import { db } from "@/config/database";
import { chordPosts } from "@/config/database/schema/chord-posts";

export async function getChordPostsData() {
  const records = await db.select().from(chordPosts);

  return records;
}
