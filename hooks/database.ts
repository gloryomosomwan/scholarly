import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq, like } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";

import { courses, semesters, tasks } from '@/db/schema';
import { db } from '@/db/init';
import { convertRawActivity, convertRawCourse, convertRawSemester } from '@/utils/database';
import { Activity, Course, Semester } from "@/types";

export function useTasks() {
  // const todayPattern = new Date().toISOString().slice(0, 10) + '%'; // timezone bug
  // const { data } = useLiveQuery(db.select().from(tasks).where(like(tasks.due, todayPattern)))
  const { data } = useLiveQuery(db.select().from(tasks))
  const activityData = data.map(convertRawActivity)
  return activityData
}

export function getActivityById(id: number | null) {
  const data = useSQLiteContext().getFirstSync<Activity>(`
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

export function useCourses(id: number | undefined) {
  const { data } = useLiveQuery(db.select().from(courses).where(eq(courses.semester_id, Number(id))), [id])
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