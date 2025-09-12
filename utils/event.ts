import { isBefore, isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, rrulestr } from "rrule";

import { Event } from "@/types";
import { pretty } from ".";

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
  if (!recurringStartDateArray[0]) return false // does this event have a recurrence that takes place today? // this line is sketchy come back to it
  const recurredStartDate = recurringStartDateArray[0]
  const recurredEndDate = getRecurredEndDate(event.startDate, event.endDate, recurredStartDate)
  const now = dayjs()
  return now.isBetween(recurredStartDate, recurredEndDate)
}

export const getOccurrencesOnDay = (recurrenceString: string, date: Date): Date[] => {
  const startOfDate = startOfDay(date) // remove this line and directly use date parameter?
  const startOfDatetime = datetime(startOfDate.getUTCFullYear(), startOfDate.getUTCMonth() + 1, startOfDate.getUTCDate(), 0, 0, 0)
  const endOfDatetime = datetime(startOfDate.getUTCFullYear(), startOfDate.getUTCMonth() + 1, startOfDate.getUTCDate(), 23, 59, 59)
  const occurrences = rrulestr(recurrenceString).between(startOfDatetime, endOfDatetime, true)
  // if (isSameDay(date, new Date(2025, 4, 20))) console.log(occurrences)
  return occurrences
}

export const checkEventWasEarlierToday = (startDate: Date, endDate: Date, recurrenceString: string | undefined): boolean => {
  const today = new Date()
  const recurredStartDateArray = recurrenceString ? getOccurrencesOnDay(recurrenceString, new Date()) : null
  if (recurredStartDateArray) {
    const recurredStartDate = recurredStartDateArray[0]
    const recurredEndDate = getRecurredEndDate(startDate, endDate, recurredStartDate)
    return isSameDay(recurredStartDate, today) && isBefore(recurredEndDate, Date.now())
  }
  else {
    return isSameDay(startDate, today) && isBefore(endDate, Date.now())
  }
}