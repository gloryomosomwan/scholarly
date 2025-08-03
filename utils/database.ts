import { Activity, Course, DueType } from "@/types/types";
import { rawActivity, rawCourse } from "@/types/drizzle";

export function convertRawActivity(rawActivity: rawActivity): Activity {
  return {
    ...rawActivity,
    description: rawActivity.description ?? undefined,
    due: rawActivity.due ? new Date(rawActivity.due) : undefined,
    dueType: rawActivity.dueType ? rawActivity.dueType as DueType : undefined,
    course: rawActivity.course ?? undefined,
    priority: rawActivity.priority ?? undefined,
    completedAt: rawActivity.completedAt ?? undefined
  }
}

export function convertRawCourse(rawCourse: rawCourse): Course {
  return {
    ...rawCourse,
    instructor: rawCourse.instructor ?? undefined,
    lectureSchedule: rawCourse.lectureSchedule ?? undefined,
    labSchedule: rawCourse.labSchedule ?? undefined,
    seminarSchedule: rawCourse.seminarSchedule ?? undefined
  }
}