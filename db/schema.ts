import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  course: text('course'),
  due: text('due'), // Store as ISO string
  dueType: text('due_type'),
  description: text('description'),
  priority: text('priority'),
  completedAt: text('completedAt')
});