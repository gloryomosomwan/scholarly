import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq, getTableColumns, like } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";

import { assignments, courses, semesters, tasks } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawTask, convertRawCourse, convertRawSemester, convertRawAssignment } from '@/utils/database';
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

export function useAssignments() {
  const { data } = useLiveQuery(db.select().from(assignments))
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
      due_type as dueType,
      completed_at as completedAt
      FROM assignments 
      WHERE id = ${id}`)
  if (data === null) return null
  const assignment = convertRawAssignment(data)
  return assignment// If id is null, data is null too
}