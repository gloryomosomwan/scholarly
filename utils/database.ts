import { Task, Course, DueType, PriorityOption, Semester, Assignment } from "@/types";
import { rawTask, rawCourse, rawSemester, rawAssignment } from "@/types/drizzle";

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

export function convertRawAssignment(rawAssignment: rawAssignment): Assignment {
  return {
    ...rawAssignment,
    courseID: rawAssignment.course_id,
    due: new Date(rawAssignment.due),
    dueType: rawAssignment.due_type as DueType,
    description: rawAssignment.description ?? undefined,
    completedAt: rawAssignment.completed_at ?? undefined,
    grade: rawAssignment.grade ?? undefined,
    weight: rawAssignment.weight ?? undefined
  }
}