import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { and, eq, getTableColumns, gte, isNotNull, lte, or } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";
import { AnySQLiteTable } from "drizzle-orm/sqlite-core";
import { endOfDay, startOfDay } from "date-fns";

import { assignments, courses, events, semesters, tasks } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawTask, convertRawCourse, convertRawSemester, convertRawAssignment, convertRawEvent } from '@/utils/database';
import { useUserStore } from "@/stores";
import { rawAssignment, rawCourse, rawEvent, rawSemester, rawTask } from "@/types/drizzle";
import { pretty } from "@/utils";
import { checkHasActiveRecurrence, getOccurrencesOnDay } from "@/utils/event";

// Assignments
export function useTodayAssignments() {
  const { data } = useLiveQuery(db.select().from(assignments).where(
    and(
      gte(assignments.due, startOfDay(new Date()).toISOString()),
      lte(assignments.due, endOfDay(new Date()).toISOString())
    )))
  const assignmentData = data.map(convertRawAssignment)
  return assignmentData
}

export function useAssignmentsByDateRange(firstDay: Date, lastDay: Date) {
  const { data } = useLiveQuery(db.select().from(assignments).where(
    and(
      gte(assignments.due, startOfDay(firstDay).toISOString()),
      lte(assignments.due, endOfDay(lastDay).toISOString())
    )
  ))
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

// Courses
export function useCourses() {
  const semesterID = useUserStore((state) => state.semesterID)
  const { data } = useLiveQuery(db.select().from(courses).where(eq(courses.semester_id, Number(semesterID))), [semesterID])
  const courseData = data.map(convertRawCourse)
  return courseData
}

export function getCourseById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<rawCourse>(`
      SELECT 
      code,
      name,
      color,
      semester_id,
      instructor
      FROM courses 
      WHERE id = ${id}
      `)
  if (data === null) return null
  const course = convertRawCourse(data)
  return course // If id is null, data is null too
}

// Events
export function useCurrentEvent() {
  const { data } = useLiveQuery(db.select().from(events).where(
    or(
      and(
        lte(events.start_date, new Date().toISOString()),
        gte(events.end_date, new Date().toISOString())
      ),
      isNotNull(events.recurring)
    )
  ))
  const eventData = data.map(convertRawEvent)
  const filteredEventData = eventData.filter((event) => {
    if (!event.recurring) return true
    return checkHasActiveRecurrence(event)
  })
  return filteredEventData
}

export function useEventsByDay(date: Date) {
  const { data } = useLiveQuery(db.select().from(events).where(
    or(
      and(
        gte(events.start_date, startOfDay(date).toISOString()),
        lte(events.end_date, endOfDay(date).toISOString())
      ),
      isNotNull(events.recurring)
    )
  ), [date])
  const eventData = data.map(convertRawEvent)
  const filteredEventData = eventData.filter((event) => {
    if (!event.recurring) return true // events that don't recur are given a pass, as their start and end dates take place on the day
    // at this point in the function body we're just checking to see if the event has a recurrence/occurrence that falls on the given date
    const occurrences = getOccurrencesOnDay(event.recurring, date)
    return occurrences.length > 0
  })
  return filteredEventData
}

export function useEventsByDateRange(firstDay: Date, lastDay: Date) {
  const { data } = useLiveQuery(db.select().from(events).where(
    and(
      gte(events.start_date, startOfDay(firstDay).toISOString()),
      lte(events.end_date, endOfDay(lastDay).toISOString())
    )
  ))
  const eventData = data.map(convertRawEvent)
  return eventData
}

export function getEventById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<rawEvent>(`
    SELECT
    type,
    name,
    start_date,
    end_date,
    location,
    course_id,
    recurring
    FROM events
    WHERE id = ${id}
    `)
  if (data === null) return null
  const event = convertRawEvent(data)
  return event // If id is null, data is null too
}

// Semesters
export function useSemesters() {
  const { data } = useLiveQuery(db.select().from(semesters))
  const semesterData = data.map(convertRawSemester)
  return semesterData
}

export function getSemesterById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<rawSemester>(`
   SELECT
   name,
   start,
   end
   FROM semesters
   WHERE id = ${id} 
    `)
  if (data === null) return null
  const semester = convertRawSemester(data)
  return semester
}

// Tasks
export function useTasksForToday() {
  const semesterID = useUserStore((state) => state.semesterID)
  // const { data } = useLiveQuery(db.select({
  //   ...getTableColumns(tasks)
  // }).from(tasks)
  //   .innerJoin(courses, eq(tasks.course_id, courses.id))
  //   .where(eq(courses.semester_id, Number(semesterID))));
  const { data } = useLiveQuery(db.select().from(tasks).where(
    and(
      gte(tasks.due, startOfDay(new Date()).toISOString()),
      lte(tasks.due, endOfDay(new Date()).toISOString())
    )
  ))
  const taskData = data.map(convertRawTask)
  return taskData
}

export function useAllTasks() {
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

export function useTasksByDateRange(firstDay: Date, lastDay: Date) {
  const { data } = useLiveQuery(db.select().from(tasks).where(
    and(
      gte(tasks.due, startOfDay(firstDay).toISOString()),
      lte(tasks.due, endOfDay(lastDay).toISOString())
    )
  ))
  const taskData = data.map(convertRawTask)
  return taskData
}
