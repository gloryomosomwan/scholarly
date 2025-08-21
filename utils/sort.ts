import { Assignment, Event, Task } from "@/types";

export function sortEventsByStartTime(a: Event, b: Event) {
  return a.startDate.toISOString().localeCompare(b.startDate.toISOString())
}

export function sortAssignmentsByDue(a: Assignment, b: Assignment) {
  return a.due.toISOString().localeCompare(b.due.toISOString())
}

export function sortTasksByDue(a: Task, b: Task) {
  return a.due!.toISOString().localeCompare(b.due!.toISOString())
}