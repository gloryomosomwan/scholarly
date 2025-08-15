import { Task, Course, DueType, PriorityOption, Semester } from "@/types";
import { rawTask, rawCourse, rawSemester } from "@/types/drizzle";

export function convertRawTask(rawTask: rawTask): Task {
  return {
    ...rawTask,
    description: rawTask.description ?? undefined,
    due: rawTask.due ? new Date(rawTask.due) : undefined,
    dueType: rawTask.dueType ? rawTask.dueType as DueType : undefined,
    courseID: rawTask.course_id ?? undefined,
    priority: rawTask.priority ? rawTask.priority as PriorityOption : undefined,
    completedAt: rawTask.completedAt ?? undefined
  }
}

export function convertRawCourse(rawCourse: rawCourse): Course {
  return {
    ...rawCourse,
    semesterID: rawCourse.semester_id,
    instructor: rawCourse.instructor ?? undefined,
    lectureSchedule: rawCourse.lectureSchedule ?? undefined,
    labSchedule: rawCourse.labSchedule ?? undefined,
    seminarSchedule: rawCourse.seminarSchedule ?? undefined
  }
}

export function convertRawSemester(rawSemester: rawSemester): Semester {
  return {
    ...rawSemester,
    start: new Date(rawSemester.start),
    end: new Date(rawSemester.end)
  }
}