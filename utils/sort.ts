import { Assignment, Event, Task, Test } from "@/types";
import { getDuration, MILLISECONDSINDAY } from "@/utils/scheduleItem";

export function sortByItemClass(a: Event | Test, b: Event | Test) {
  if (getDuration(a) >= MILLISECONDSINDAY && getDuration(b) < MILLISECONDSINDAY) return -1
  else if (getDuration(a) >= MILLISECONDSINDAY && getDuration(b) >= MILLISECONDSINDAY) return 0
  else if (getDuration(a) < MILLISECONDSINDAY && getDuration(b) >= MILLISECONDSINDAY) return 1
  else return 0
}

export function sortScheduleItems(a: Event | Test, b: Event | Test) {
  return a.startDate.toISOString().localeCompare(b.startDate.toISOString())
}

export function sortAssignmentsByDue(a: Assignment, b: Assignment) {
  return a.due.toISOString().localeCompare(b.due.toISOString())
}

export function sortTasksByDue(a: Task, b: Task) {
  return a.due!.toISOString().localeCompare(b.due!.toISOString())
}