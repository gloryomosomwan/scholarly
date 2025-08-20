import { Event } from "@/types";

export function sortEventsByDay(a: Event, b: Event) {
  return a.startDate.toISOString().localeCompare(b.startDate.toISOString())
}