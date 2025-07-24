import { Activity, DueType } from "@/types/types";
import { rawActivity } from "@/types/drizzle";

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