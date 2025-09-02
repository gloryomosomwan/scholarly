import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  course_id: integer('course_id').references(() => courses.id),
  due: text('due'), // Store as ISO string
  dueType: text('due_type'),
  description: text('description'),
  priority: text('priority'),
  completed_at: text('completed_at')
});

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  color: text('color').notNull(),
  semester_id: integer('semester_id').notNull().references(() => semesters.id),
  instructor: text('instructor'),
})

export const semesters = sqliteTable('semesters', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  start: text('start').notNull(), // ISO 8601 
  end: text('end').notNull() // ISO 8601 
})

export const assignments = sqliteTable('assignments', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  course_id: integer('course_id').references(() => courses.id).notNull(),
  description: text('description'),
  due: text('due').notNull(),
  due_type: text('due_type').notNull(),
  completed_at: text('completed_at'),
  weight: real('weight'),
  grade: real('grade')
})

export const events = sqliteTable('events', {
  id: integer('id').primaryKey(),
  type: text('type').notNull(),
  course_id: integer('course_id').references(() => courses.id),
  start_date: text('start_date').notNull(),
  end_date: text('end_date').notNull(),
  name: text('name'),
  location: text('location')
})