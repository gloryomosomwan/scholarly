import * as schema from "@/db/schema";
export type rawActivity = typeof schema.tasks.$inferSelect;
export type rawCourse = typeof schema.courses.$inferSelect