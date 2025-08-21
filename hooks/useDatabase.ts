import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { and, eq, getTableColumns, gte, like, lte } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";
import { AnySQLiteTable } from "drizzle-orm/sqlite-core";
import { endOfDay, endOfWeek, lastDayOfMonth, startOfDay, startOfWeek } from "date-fns";

import { assignments, courses, events, semesters, tasks } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawTask, convertRawCourse, convertRawSemester, convertRawAssignment, convertRawEvent } from '@/utils/database';
import { Course, Semester } from "@/types";
import { useUserStore } from "@/stores";
import { rawAssignment, rawCourse, rawTask } from "@/types/drizzle";

export function useTasks() {
  // const todayPattern = new Date().toISOString().slice(0, 10) + '%'; // timezone bug
  // const { data } = useLiveQuery(db.select().from(tasks).where(like(tasks.due, todayPattern)))
  const semesterID = useUserStore((state) => state.semesterID)
  // const { data } = useLiveQuery(db.select({
  //   ...getTableColumns(tasks)
  // }).from(tasks)
  //   .innerJoin(courses, eq(tasks.course_id, courses.id))
  //   .where(eq(courses.semester_id, Number(semesterID))));
  const { data } = useLiveQuery(db.select().from(tasks))
  const taskData = data.map(convertRawTask)
  return taskData
}

export function getTaskById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<rawTask>(`
      SELECT 
      id,
      title,
      course_id,
      due,
      due_type as dueType,
      description,
      priority,
      completed_at as completedAt
      FROM tasks
      WHERE id = ${id}`)
  if (data === null) return null
  const task = convertRawTask(data)
  return task // If id is null, data is null too
}

export function useTasksByDay(date: Date) {
  const { data } = useLiveQuery(db.select().from(tasks).where(
    and(
      gte(tasks.due, startOfDay(date).toISOString()),
      lte(tasks.due, endOfDay(date).toISOString())
    )
  ), [date])
  const taskData = data.map(convertRawTask)
  return taskData
}

export function useCourses() {
  const semesterID = useUserStore((state) => state.semesterID)
  const { data } = useLiveQuery(db.select().from(courses).where(eq(courses.semester_id, Number(semesterID))), [semesterID])
  const courseData = data.map(convertRawCourse)
  return courseData
}

export function getCourseById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<Course>(`
      SELECT 
      code,
      name,
      color,
      semester_id,
      instructor
      FROM courses 
      WHERE id = ${id}
      `)
  return data // If id is null, data is null too
}

export function useSemesters() {
  const { data } = useLiveQuery(db.select().from(semesters))
  const semesterData = data.map(convertRawSemester)
  return semesterData
}

export function getSemesterById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<Semester>(`
   SELECT
   name,
   start,
   end
   FROM semesters
   WHERE id = ${id} 
    `)
  return data
}

export function useCurrentEvent() {
  const { data } = useLiveQuery(db.select().from(events).where(
    and(
      lte(events.start_date, new Date().toISOString()),
      gte(events.end_date, new Date().toISOString())
    )
  ))
  const eventData = data.map(convertRawEvent)
  return eventData
}

export function useEventsByDay(date: Date) {
  const { data } = useLiveQuery(db.select().from(events).where(
    and(
      gte(events.start_date, startOfDay(date).toISOString()),
      lte(events.end_date, endOfDay(date).toISOString())
    )
  ), [date])
  const eventData = data.map(convertRawEvent)
  return eventData
}

export function useEventsByMonth(firstDay: Date, lastDay: Date) {
  const { data } = useLiveQuery(db.select().from(events).where(
    and(
      gte(events.start_date, firstDay.toISOString()),
      lte(events.end_date, lastDay.toISOString())
    )
  ))
  const eventData = data.map(convertRawEvent)
  return eventData
}

export function useAssignmentsByMonth(firstDay: Date, lastDay: Date) {
  const { data } = useLiveQuery(db.select().from(assignments).where(
    and(
      gte(assignments.due, firstDay.toISOString()),
      lte(assignments.due, lastDay.toISOString())
    )
  ))
  const assignmentData = data.map(convertRawAssignment)
  return assignmentData
}

export function useAssignments() {
  const { data } = useLiveQuery(db.select().from(assignments))
  const assignmentData = data.map(convertRawAssignment)
  return assignmentData
}

export function useAssignmentsByCourse(courseID: number) {
  const { data } = useLiveQuery(db.select().from(assignments).where(eq(assignments.course_id, courseID)))
  const assignmentData = data.map(convertRawAssignment)
  return assignmentData
}

export function useAssignmentsByDay(date: Date) {
  const { data } = useLiveQuery(db.select().from(assignments).where(
    and(
      gte(assignments.due, startOfDay(date).toISOString()),
      lte(assignments.due, endOfDay(date).toISOString())
    )
  ), [date])
  const assignmentData = data.map(convertRawAssignment)
  return assignmentData
}

export function getAssignmentById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<rawAssignment>(`
      SELECT 
      id,
      title,
      course_id,
      description,
      due,
      due_type,
      completed_at
      FROM assignments 
      WHERE id = ${id}`)
  if (data === null) return null
  const assignment = convertRawAssignment(data)
  return assignment// If id is null, data is null too
}

export async function toggleCompleted(id: number, completedAt: string | undefined, table: AnySQLiteTable) {
  if (completedAt) {
    await db.update(assignments).set({ completed_at: null }).where(eq(assignments.id, id))
  }
  else if (!completedAt) {
    await db.update(assignments).set({ completed_at: new Date().toISOString() }).where(eq(assignments.id, id))
  }
};