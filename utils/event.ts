import { endOfDay, isEqual, isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, rrulestr } from "rrule";

import { Event, EventClass } from "@/types";
import { pretty } from ".";

// debugging constants
const MILLISECONDSINMINUTE = 60000
const MILLISECONDSINHOUR = MILLISECONDSINMINUTE * 60
const MILLISECONDSINDAY = 24 * MILLISECONDSINHOUR

function startsAtMidnight(event: Event): boolean {
  return isEqual(event.startDate, startOfDay(event.startDate))
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
  return new Date(occurrence.getUTCFullYear(), occurrence.getUTCMonth(), occurrence.getUTCDate(), occurrence.getUTCHours(), occurrence.getUTCMinutes(), occurrence.getUTCSeconds()) // CHECK: does month not need to be decremented by one here?
}

function passJSDateToDatetime(date: Date): Date {
  return datetime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
}

export const getEventOccurrencesBetweenDays = (recurrence: string, startDate: Date, endDate: Date): Date[] | null => {
  const startOfStart = startOfDay(startDate)
  const startOfStartDT = passJSDateToDatetime(startOfStart)
  const duration = endDate.getTime() - startDate.getTime()
  const startLookback = new Date(startOfStart.getTime() - duration)
  const startLookbackDT = passJSDateToDatetime(startLookback)
  const startOccurrences = rrulestr(recurrence).between(startLookbackDT, startOfStartDT, false)
  const endOfEnd = endOfDay(endDate)
  const endOfEndDT = passJSDateToDatetime(endOfEnd)
  const endOccurrences = rrulestr(recurrence).between(startOfStartDT, endOfEndDT, true)
  const occurrences = [...startOccurrences, ...endOccurrences]
  if (occurrences.length === 0) return null
  return occurrences
}

function getRecurredEndDate(startDate: Date, endDate: Date, recurredStartDate: Date): Date {
  const duration = endDate.getTime() - startDate.getTime()
  const recurredEndDate = new Date(recurredStartDate.getTime() + duration)
  return recurredEndDate
}

// Events By Day

function getEventOccurrencesByDay(eventDuration: number, date: Date, recurrence: string): Date[] | null {
  const start = startOfDay(date)
  const startDT = passJSDateToDatetime(start)
  const startLookback = new Date(start.getTime() - eventDuration)
  const startLookbackDT = passJSDateToDatetime(startLookback)
  const startOccurrences = rrulestr(recurrence).between(startLookbackDT, startDT, false)
  const end = endOfDay(date)
  const endDT = passJSDateToDatetime(end)
  const endOccurrences = rrulestr(recurrence).between(startDT, endDT, true)
  const occurrences = [...startOccurrences, ...endOccurrences]
  if (occurrences.length === 0) return null
  else return occurrences
}

export function getRecurrenceEventsByDay(events: Event[], date: Date): Event[] {
  // Takes in an array of unconverted recurring Events and returns an array of JS-converted Events that take place on the given day (i.e. creates events with correct dates)
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return // there shouldn't be events w/o recurrences in here but this is needed as a type guard
    const duration = event.endDate.getTime() - event.startDate.getTime()
    const occurrences = getEventOccurrencesByDay(duration, date, event.recurring)
    if (occurrences) {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrences[0])
      const recurredEndDate = new Date(recurredStartDate.getTime() + duration)
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

// Current Events

function getOccurrencesThatTakePlaceBetweenLookbackAndRightNow(eventDuration: number, recurrenceString: string) {
  const now = new Date()
  const nowDT = passJSDateToDatetime(now)
  const lookback = new Date(now.getTime() - eventDuration)
  const lookbackDT = passJSDateToDatetime(lookback)
  // const lb = new Date(now.getTime() - MILLISECONDSINHOUR * 39)
  // console.log(rrulestr(recurrenceString).all())
  // console.log('lb', lb)
  // console.log('lbDT', lbDT)
  const occurrences = rrulestr(recurrenceString).between(lookbackDT, nowDT, true)
  if (occurrences.length === 0) return null
  else return occurrences
}

export const checkCurrentEvent = (event: Event): boolean => {
  const now = dayjs()
  return now.isBetween(event.startDate, event.endDate) || checkHasActiveRecurrence(event)
}

const checkHasActiveRecurrence = (event: Event): boolean => {
  if (!event.recurring) return false
  const duration = event.endDate.getTime() - event.startDate.getTime()
  const occurrences = getOccurrencesThatTakePlaceBetweenLookbackAndRightNow(duration, event.recurring)
  if (!occurrences) return false // CHECK: does this event have a recurrence that takes place today? // this line is sketchy come back to it
  const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrences[0])
  const recurredEndDate = getRecurredEndDate(event.startDate, event.endDate, recurredStartDate)
  const now = dayjs()
  return now.isBetween(recurredStartDate, recurredEndDate)
}

export function getActiveRecurrenceEvents(events: Event[]): Event[] {
  // Takes in an array of unconverted recurring Events and returns an array of JS-converted currently active Events (i.e. creates events with correct dates)
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return // there shouldn't be events w/o recurrences in here but this is needed as a type guard
    const duration = event.endDate.getTime() - event.startDate.getTime()
    // console.log(duration / 3600000)
    const occurrences = getOccurrencesThatTakePlaceBetweenLookbackAndRightNow(duration, event.recurring)
    // console.log(occurrences)
    if (occurrences) {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrences[0])
      const recurredEndDate = new Date(recurredStartDate.getTime() + duration)
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