import { isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, rrulestr } from "rrule";

import { Event } from "@/types";

function getMinutesSinceMidnight(date: Date) {
  // local time
  return date.getHours() * 60 + date.getMinutes(); // potential bug with the minutes
}

export const checkCurrentEvent = (event: Event): boolean => {
  const now = dayjs()
  return now.isBetween(event.startDate, event.endDate) || checkHasCurrentRecurrence(event)
}

export const checkHasCurrentRecurrence = (event: Event): boolean => {
  if (!event.recurring) return false
  const startMinutes = getMinutesSinceMidnight(event.startDate)
  const endMinutes = getMinutesSinceMidnight(event.endDate)
  const currentMinutes = getMinutesSinceMidnight(new Date())
  const isWithinTimeRange = (isSameDay(event.startDate, event.endDate) && startMinutes <= currentMinutes && currentMinutes <= endMinutes) || (!isSameDay(event.startDate, event.endDate) && startMinutes <= currentMinutes || currentMinutes <= endMinutes)
  if (isWithinTimeRange) {
    const occurrences = getOccurrences(event.recurring)
    if (occurrences) {
      return true
    }
  }
  return false
}

export const getOccurrences = (recurrenceString: string): null | Date[] => {
  const startOfToday = startOfDay(new Date())
  const startOfDatetime = datetime(startOfToday.getUTCFullYear(), startOfToday.getUTCMonth() + 1, startOfToday.getUTCDate(), 0, 0, 0)
  const endOfDatetime = datetime(startOfToday.getUTCFullYear(), startOfToday.getUTCMonth() + 1, startOfToday.getUTCDate(), 23, 59, 59)
  const occurrences = rrulestr(recurrenceString).between(startOfDatetime, endOfDatetime, true)
  return occurrences
}