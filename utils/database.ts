import { Activity } from "@/types";

type activity = {
  id: number;
  title: string;
  course: string | null;
  due: string | null;
  description: string | null;
  priority: string | null;
}[]

export function toActivity(activity: (activity)[number]): Activity {
  return {
    ...activity,
    description: activity.description ?? undefined,
    due: activity.due ? new Date(activity.due) : undefined,
    course: activity.course ?? undefined,
    priority: activity.priority ?? undefined
  }
}