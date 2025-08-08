import { semesters } from "./schema";
import { createInsertSchema } from 'drizzle-zod'

export const semesterInsertSchema = createInsertSchema(semesters)