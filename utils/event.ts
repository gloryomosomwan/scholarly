import { endOfDay, isBefore, isEqual, isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, rrulestr } from "rrule";

import { Event, EventClass } from "@/types";
import { pretty } from ".";

function getRecurredEndDate(startDate: Date, endDate: Date, recurredStartDate: Date): Date {
  const offset = endDate.getTime() - startDate.getTime()
  const recurredEndDate = new Date(recurredStartDate.getTime() + offset)
  return recurredEndDate
}

function startsAtMidnight(event: Event): boolean {
  return isEqual(event.startDate, startOfDay(event.startDate))
}

const checkHasActiveRecurrence = (event: Event): boolean => {
  if (!event.recurring) return false
  const occurrences = getOccurrencesOnDay(event.recurring, new Date())
  if (!occurrences) return false // CHECK: does this event have a recurrence that takes place today? // this line is sketchy come back to it
  const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrences[0])
  const recurredEndDate = getRecurredEndDate(event.startDate, event.endDate, recurredStartDate)
  const now = dayjs()
  return now.isBetween(recurredStartDate, recurredEndDate)
}

export const checkCurrentEvent = (event: Event): boolean => {
  const now = dayjs()
  return now.isBetween(event.startDate, event.endDate) || checkHasActiveRecurrence(event)
}

export const getOccurrencesOnDay = (recurrenceString: string, date: Date): Date[] | null => {
  const startOfDate = startOfDay(date) // CHECK: remove this line and directly use date parameter?
  const startOfDatetime = datetime(startOfDate.getUTCFullYear(), startOfDate.getUTCMonth() + 1, startOfDate.getUTCDate(), 0, 0, 0)
  const endOfDatetime = datetime(startOfDate.getUTCFullYear(), startOfDate.getUTCMonth() + 1, startOfDate.getUTCDate(), 23, 59, 59)
  const occurrences = rrulestr(recurrenceString).between(startOfDatetime, endOfDatetime, true)
  if (occurrences.length === 0) return null
  else return occurrences
}

export const getOccurrencesBetweenDays = (recurrenceString: string, startDate: Date, endDate: Date): Date[] => {
  const startOfStart = startOfDay(startDate) // CHECK: remove this line and directly use date parameter?
  const endOfEnd = endOfDay(endDate)
  const startOfDatetime = datetime(startOfStart.getUTCFullYear(), startOfStart.getUTCMonth() + 1, startOfStart.getUTCDate(), 0, 0, 0)
  const endOfDatetime = datetime(endOfEnd.getUTCFullYear(), endOfEnd.getUTCMonth() + 1, endOfEnd.getUTCDate(), 23, 59, 59)
  const occurrences = rrulestr(recurrenceString).between(startOfDatetime, endOfDatetime, true)
  return occurrences
}

export const checkEventWasEarlierToday = (startDate: Date, endDate: Date): boolean => {
  const today = new Date()
  return isSameDay(startDate, today) && isBefore(endDate, Date.now())
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

export function convertRRuleOccurrenceToJSDate(occurrence: Date): Date {
  // The UTC components of RRule occurrence Dates actually represent local time, so here we employ the appropriate conversions
  return new Date(occurrence.getUTCFullYear(), occurrence.getUTCMonth(), occurrence.getUTCDate(), occurrence.getUTCHours(), occurrence.getUTCMinutes(), occurrence.getUTCSeconds())
}

export function getRecurrenceEventsByDay(events: Event[], date: Date): Event[] {
  // Takes in an array of unconverted recurring Events and returns an array of JS-converted Events that take place on the given day (i.e. creates events with correct dates)
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return // there shouldn't be events w/o recurrences in here but this is needed as a type guard
    const occurrences = getOccurrencesOnDay(event.recurring, date)
    if (occurrences) {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrences[0])
      const offset = event.endDate.getTime() - event.startDate.getTime()
      const recurredEndDate = new Date(recurredStartDate.getTime() + offset)
      const newEvt: Event = {
        ...event,
        startDate: recurredStartDate,
        endDate: recurredEndDate
      }
      eventArray.push(newEvt)
    }
  });
  return eventArray
}

export function getActiveRecurrenceEvents(events: Event[]): Event[] {
  // Takes in an array of unconverted recurring Events and returns an array of JS-converted currently active Events (i.e. creates events with correct dates)
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return
    const occurrences = getOccurrencesOnDay(event.recurring, new Date())
    if (occurrences) {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrences[0])
      const offset = event.endDate.getTime() - event.startDate.getTime()
      const recurredEndDate = new Date(recurredStartDate.getTime() + offset)
      const now = dayjs()
      if (now.isBetween(recurredStartDate, recurredEndDate)) {
        const newEvt: Event = {
          ...event,
          startDate: recurredStartDate,
          endDate: recurredEndDate
        }
        eventArray.push(newEvt)
      }
    }
  });
  return eventArray
}