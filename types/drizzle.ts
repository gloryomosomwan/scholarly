import * as schema from "@/db/schema";
export type rawTask = typeof schema.tasks.$inferSelect;
export type rawCourse = typeof schema.courses.$inferSelect
export type rawSemester = typeof schema.semesters.$inferSelect
export type rawAssignment = typeof schema.assignments.$inferSelect
export type rawEvent = typeof schema.events.$inferSelect