import { create } from "zustand";
import { assignments, events, semesters, tasks } from "./schema";
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

export const assignmentInsertSchema = createInsertSchema(assignments, {
  title: (schema) => schema.min(1)
})

export const assignmentUpdateSchema = createUpdateSchema(assignments, {
  title: (schema) => schema.min(1)
})

export const eventInsertSchema = createInsertSchema(events, {
  name: (schema) => schema.min(1)
})

export const eventUpdateSchema = createInsertSchema(events, {
  name: (schema) => schema.min(1)
})