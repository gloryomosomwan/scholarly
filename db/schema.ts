import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  course_id: integer('course_id').references(() => courses.id),
  due: text('due'), // Store as ISO string
  dueType: text('due_type'),
  description: text('description'),
  priority: text('priority'),
  completedAt: text('completed_at')
});

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  color: text('color').notNull(),
  instructor: text('instructor'),
  lectureSchedule: text('lectureSchedule'),
  labSchedule: text('labSchedule'),
  seminarSchedule: text('seminarSchedule')
})