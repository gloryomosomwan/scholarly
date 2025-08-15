import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq, getTableColumns, like } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";

import { courses, semesters, tasks } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawTask, convertRawCourse, convertRawSemester } from '@/utils/database';
import { Task, Course, Semester } from "@/types";
import { useUserStore } from "@/stores";

export function useTasks() {
  // const todayPattern = new Date().toISOString().slice(0, 10) + '%'; // timezone bug
  // const { data } = useLiveQuery(db.select().from(tasks).where(like(tasks.due, todayPattern)))
  const semesterID = useUserStore((state) => state.semesterID)
  const { data } = useLiveQuery(db.select({
    ...getTableColumns(tasks)
  }).from(tasks)
    .innerJoin(courses, eq(tasks.course_id, courses.id))
    .where(eq(courses.semester_id, Number(semesterID))));
  const taskData = data.map(convertRawTask)
  return taskData
}

export function getTaskById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<Task>(`
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
  return data // If id is null, data is null too
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
      semester_id
      instructor,
      lectureSchedule,
      seminarSchedule,
      labSchedule
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