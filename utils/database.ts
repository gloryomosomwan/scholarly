import { Activity, rawActivity, DueType } from "@/types";

export function convertRawActivity(activity: rawActivity): Activity {
  return {
    ...activity,
    description: activity.description ?? undefined,
    due: activity.due ? new Date(activity.due) : undefined,
    dueType: activity.dueType ? activity.dueType as DueType : undefined,
    course: activity.course ?? undefined,
    priority: activity.priority ?? undefined,
    completedAt: activity.completedAt ?? undefined
  }
}