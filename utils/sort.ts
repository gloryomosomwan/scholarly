import { Assignment, Event, Task } from "@/types";

export function sortEventsByDay(a: Event, b: Event) {
  return a.startDate.toISOString().localeCompare(b.startDate.toISOString())
}

export function sortAssignmentsByDay(a: Assignment, b: Assignment) {
  return a.due.toISOString().localeCompare(b.due.toISOString())
}

export function sortTasksByDay(a: Task, b: Task) {
  return a.due!.toISOString().localeCompare(b.due!.toISOString())
}