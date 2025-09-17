import { endOfDay, isBefore, isEqual, isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, rrulestr } from "rrule";

import { Event, EventClass } from "@/types";
import { pretty } from ".";
import { useCalendarStore } from "@/stores/calendar";

function getRecurredEndDate(startDate: Date, endDate: Date, recurredStartDate: Date) {
  const offset = endDate.getTime() - startDate.getTime()
  const recurredEndDate = recurredStartDate.getTime() + offset
  return recurredEndDate
}

export const checkCurrentEvent = (event: Event): boolean => {
  const now = dayjs()
  return now.isBetween(event.startDate, event.endDate) || checkHasActiveRecurrence(event)
}

export const checkHasActiveRecurrence = (event: Event): boolean => {
  if (!event.recurring) return false
  const recurringStartDateArray = getOccurrencesOnDay(event.recurring, new Date())
  if (!recurringStartDateArray[0]) return false // CHECK: does this event have a recurrence that takes place today? // this line is sketchy come back to it
  const recurredStartDate = recurringStartDateArray[0]
  const recurredEndDate = getRecurredEndDate(event.startDate, event.endDate, recurredStartDate)
  const now = dayjs()
  return now.isBetween(recurredStartDate, recurredEndDate)
}

export const getOccurrencesOnDay = (recurrenceString: string, date: Date): Date[] => {
  const startOfDate = startOfDay(date) // CHECK: remove this line and directly use date parameter?
  const startOfDatetime = datetime(startOfDate.getUTCFullYear(), startOfDate.getUTCMonth() + 1, startOfDate.getUTCDate(), 0, 0, 0)
  const endOfDatetime = datetime(startOfDate.getUTCFullYear(), startOfDate.getUTCMonth() + 1, startOfDate.getUTCDate(), 23, 59, 59)
  const occurrences = rrulestr(recurrenceString).between(startOfDatetime, endOfDatetime, true)
  return occurrences
}

export const getOccurrencesBetweenDays = (recurrenceString: string, startDate: Date, endDate: Date): Date[] => {
  const startOfStart = startOfDay(startDate) // CHECK: remove this line and directly use date parameter?
  const endOfEnd = endOfDay(endDate)
  const startOfDatetime = datetime(startOfStart.getUTCFullYear(), startOfStart.getUTCMonth() + 1, startOfStart.getUTCDate(), 0, 0, 0)
  const endOfDatetime = datetime(endOfEnd.getUTCFullYear(), endOfEnd.getUTCMonth() + 1, endOfEnd.getUTCDate(), 23, 59, 59)
  const occurrences = rrulestr(recurrenceString).between(startOfDatetime, endOfDatetime, true)
  return occurrences
}

export const checkEventWasEarlierToday = (startDate: Date, endDate: Date, recurrenceString: string | undefined): boolean => {
  const today = new Date()
  const { currentDate } = useCalendarStore()
  if (!isSameDay(currentDate, today)) return false // CHECK: adding this logic works but it isn't smooth
  if (!recurrenceString) {
    return isSameDay(startDate, today) && isBefore(endDate, Date.now())
  }
  else {
    const recurredStartDateArray = recurrenceString ? getOccurrencesOnDay(recurrenceString, currentDate) : null
    if (recurredStartDateArray && recurredStartDateArray.length > 0) {
      const recurredStartDate = recurredStartDateArray[0]
      const recurredEndDate = getRecurredEndDate(startDate, endDate, recurredStartDate)
      return isSameDay(recurredStartDate, today) && isBefore(recurredEndDate, Date.now())
    }
    return false
  }
}

export const getEventClass = (event: Event): EventClass => {
  const MILLISECONDSINADAY = 86400000
  const duration = event.endDate.getTime() - event.startDate.getTime()
  if (duration > MILLISECONDSINADAY || (duration === MILLISECONDSINADAY && !isSameDay(event.startDate, event.endDate)) && !startsAtMidnight(event)) {
    return 'multiday'
  }
  else if (duration === MILLISECONDSINADAY && !isSameDay(event.startDate, event.endDate) && startsAtMidnight(event)) {
    return 'allday'
  }
  else if (duration < MILLISECONDSINADAY && !isSameDay(event.startDate, event.endDate)) {
    return 'crossover'
  }
  else {
    return 'regular'
  }
}

function startsAtMidnight(event: Event) {
  return isEqual(event.startDate, startOfDay(event.startDate))
}