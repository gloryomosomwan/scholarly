import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { and, eq, getTableColumns, gt, gte, isNotNull, isNull, lte, or } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";
import { AnySQLiteTable } from "drizzle-orm/sqlite-core";
import { endOfDay, startOfDay } from "date-fns";

import { assignments, courses, events, semesters, tasks, tests } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawTask, convertRawCourse, convertRawSemester, convertRawAssignment, convertRawEvent, convertRawTest } from '@/utils/conversion';
import { useUserStore } from "@/stores";
import { rawAssignment, rawCourse, rawEvent, rawSemester, rawTask, rawTest } from "@/types/drizzle";
import { getActiveRecurrenceEvents, getRecurrenceEventsByDay, getUpNextRecurrenceEvents } from "@/utils/scheduleItem";
import { Assignment, Event, Task } from '@/types';
import { pretty } from "@/utils";

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

export function useNumberOfCoursesBySemester(id: number) {
  const { data } = useLiveQuery(db.select().from(courses).where(eq(courses.semester_id, id)), [id])
  return data.length
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
export function useCurrentEvents(date: Date) {
  const { data: originalEventData } = useLiveQuery(db.select().from(events).where(
    and(
      and(
        lte(events.start_date, new Date().toISOString()),
        gte(events.end_date, new Date().toISOString())
      ),
      isNull(events.recurring)
    )
  ), [date])
  const originalEventArray = originalEventData.map(convertRawEvent)
  const { data: recurredEventData } = useLiveQuery(db.select().from(events).where(isNotNull(events.recurring)))
  const rawRecurredEventArray = recurredEventData.map(convertRawEvent)
  const recurredEventArray = getActiveRecurrenceEvents(rawRecurredEventArray)
  const finalEventArray = originalEventArray.concat(recurredEventArray)
  return finalEventArray
}

export function useEventsByDay(date: Date) {
  const { data: rawNonRecurringEventArray } = useLiveQuery(db.select().from(events).where(
    and(
      or(
        and(
          gte(events.start_date, startOfDay(date).toISOString()),
          lte(events.start_date, endOfDay(date).toISOString())
        ),
        and(
          gt(events.end_date, startOfDay(date).toISOString()), // CHECK gt vs gte
          lte(events.end_date, endOfDay(date).toISOString())
        ),
        // CHECK: this logic may not be complete
        and(
          lte(events.start_date, startOfDay(date).toISOString()),
          gte(events.end_date, endOfDay(date).toISOString())
        )
      ),
      isNull(events.recurring)
    )
  ), [date])
  const nonRecurringEventArray = rawNonRecurringEventArray.map(convertRawEvent)
  const { data: rawRecurringEventArray } = useLiveQuery(db.select().from(events).where(isNotNull(events.recurring)), [date])
  const recurringEventArray = rawRecurringEventArray.map(convertRawEvent)
  const recurrenceEventArray = getRecurrenceEventsByDay(recurringEventArray, date)
  const finalEventArray = nonRecurringEventArray.concat(recurrenceEventArray)
  return finalEventArray
}

export function useEventsByDateRange(firstDay: Date, lastDay: Date) {
  const { data } = useLiveQuery(db.select().from(events).where(
    or(
      and(
        gte(events.start_date, startOfDay(firstDay).toISOString()),
        lte(events.end_date, endOfDay(lastDay).toISOString())
      ),
      isNotNull(events.recurring))
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

export function useUpNextEvents() {
  // CHECK: this may need a dependency array to refresh the query
  const { data: rawNonRecurringEventArray } = useLiveQuery(db.select().from(events).where(
    and(
      gte(events.start_date, new Date().toISOString()),
      isNull(events.recurring)
    )
  ))
  const nonRecurringEventArray = rawNonRecurringEventArray.map(convertRawEvent)
  const { data: rawRecurringEventArray } = useLiveQuery(db.select().from(events).where(isNotNull(events.recurring)))
  const recurringEventArray = rawRecurringEventArray.map(convertRawEvent)
  const recurrenceEventArray = getUpNextRecurrenceEvents(recurringEventArray)
  const finalEventArray = nonRecurringEventArray.concat(recurrenceEventArray)
  return finalEventArray
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

// Tests

export function useTestsByCourse(courseID: number) {
  const { data } = useLiveQuery(db.select().from(tests).where(eq(tests.course_id, courseID)), [courseID])
  const testData = data.map(convertRawTest)
  return testData
}

export function getTestById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<rawTest>(`
    SELECT
    start_date,
    end_date,
    name,
    course_id,
    location,
    notes,
    weight,
    grade
    FROM tests 
    WHERE id = ${id}
    `)
  if (data === null) return null
  const test = convertRawTest(data)
  return test
}

export function useTestsByDay(date: Date) {
  const { data } = useLiveQuery(db.select().from(tests).where(
    and( // CHECK: this AND statement seems useless
      or(
        and(
          gte(tests.start_date, startOfDay(date).toISOString()),
          lte(tests.start_date, endOfDay(date).toISOString())
        ),
        and(
          gt(tests.end_date, startOfDay(date).toISOString()), // CHECK gt vs gte
          lte(tests.end_date, endOfDay(date).toISOString())
        ),
        // CHECK: this logic may not be complete
        and(
          lte(tests.start_date, startOfDay(date).toISOString()),
          gte(tests.end_date, endOfDay(date).toISOString())
        )
      ),
    )
  ), [date])
  const testData = data.map(convertRawTest)
  return testData
}

export function useCurrentTests(date: Date) {
  const { data } = useLiveQuery(db.select().from(tests).where(
    and(
      lte(tests.start_date, new Date().toISOString()),
      gte(tests.end_date, new Date().toISOString())
    )
  ), [date])
  const testData = data.map(convertRawTest)
  return testData
}

export function useUpNextTests() {
  const { data } = useLiveQuery(db.select().from(tests).where(gte(tests.start_date, new Date().toISOString())))
  const testData = data.map(convertRawTest)
  return testData
}

// Other

export function useItemsByDateRange(start: Date, end: Date) {
  const events: Event[] = useEventsByDateRange(start, end);
  const assignments: Assignment[] = useAssignmentsByDateRange(start, end);
  const tasks: Task[] = useTasksByDateRange(start, end);
  return [...events, ...assignments, ...tasks]
}