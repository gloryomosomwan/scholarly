import { compareAsc } from "date-fns"
import { Event, Task } from "@/types"

export const compareEventTimes = (eventA: Event, eventB: Event): number => {
  return compareAsc(eventA.start, eventB.start)
}

export const compareTaskTimes = (taskA: Task, taskB: Task): number => {
  if (!taskA.due || !taskB.due) {
    return 0
  }
  const result = compareAsc(taskA.due, taskB.due)
  if (result !== 0) {
    return result
  }
  return taskA.title.localeCompare(taskB.title)
}