import { isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, rrulestr } from "rrule";

import { Event } from "@/types";

function getTimeInMinutesSinceMidnight(date: Date) {
  // local time
  return date.getHours() * 60 + date.getMinutes(); // potential bug with the minutes
}

export const isCurrentEvent = (event: Event): boolean => {
  const now = dayjs()
  return now.isBetween(event.startDate, event.endDate)
}

export const hasCurrentRecurrence = (event: Event): boolean => {
  if (!event.recurring) return true
  else {
    const startMin = getTimeInMinutesSinceMidnight(event.startDate)
    const endMin = getTimeInMinutesSinceMidnight(event.endDate)
    const currentMin = getTimeInMinutesSinceMidnight(new Date())
    const isWithinTimeRange = (isSameDay(event.startDate, event.endDate) && startMin <= currentMin && currentMin <= endMin) || (!isSameDay(event.startDate, event.endDate) && startMin <= currentMin || currentMin <= endMin)
    if (isWithinTimeRange) {
      const startOfToday = startOfDay(new Date())
      const startOfDatetime = datetime(startOfToday.getUTCFullYear(), startOfToday.getUTCMonth() + 1, startOfToday.getUTCDate(), 0, 0, 0)
      const endOfDatetime = datetime(startOfToday.getUTCFullYear(), startOfToday.getUTCMonth() + 1, startOfToday.getUTCDate(), 23, 59, 59)
      const occurrences = rrulestr(event.recurring).between(startOfDatetime, endOfDatetime, true)
      if (occurrences) {
        return true
      }
      else {
        return false
      }
    }
    return false
  }
}