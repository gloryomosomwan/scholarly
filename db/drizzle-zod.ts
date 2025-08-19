import { semesters, tasks } from "./schema";
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'

export const semesterInsertSchema = createInsertSchema(semesters, {
  name: (schema) => schema.min(1)
})

export const semesterUpdateSchema = createUpdateSchema(semesters, {
  name: (schema) => schema.min(1)
})

export const taskInsertSchema = createInsertSchema(tasks, {
  title: (schema) => schema.min(1)
})

export const taskUpdateSchema = createUpdateSchema(tasks, {
  title: (schema) => schema.min(1)
})