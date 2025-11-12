import { addDays, endOfDay, getDay, isEqual, isSameDay, startOfDay } from "date-fns";
import dayjs from "dayjs";
import { datetime, RRule, rrulestr, Weekday } from "rrule";

import { Event, ScheduleItemClass, Test } from "@/types";
import { pretty } from ".";
import { useItemsWithinNextDay } from "@/hooks/useDatabase";

const MILLISECONDSINMINUTE = 60000
const MILLISECONDSINHOUR = MILLISECONDSINMINUTE * 60
export const MILLISECONDSINDAY = 24 * MILLISECONDSINHOUR

export function getDuration(item: Event | Test) {
  const duration = item.endDate.getTime() - item.startDate.getTime()
  return duration
}

function startsAtMidnight(start: Date): boolean {
  return isEqual(start, startOfDay(start))
}

export const getScheduleItemClass = (start: Date, end: Date): ScheduleItemClass => {
  const MILLISECONDSINADAY = 86400000
  const duration = end.getTime() - start.getTime()
  if (duration > MILLISECONDSINADAY || (duration === MILLISECONDSINADAY && !isSameDay(start, end)) && !startsAtMidnight(start)) {
    return 'multiday'
  }
  else if (duration === MILLISECONDSINADAY && !isSameDay(start, end) && startsAtMidnight(start)) {
    return 'allday'
  }
  else if (duration < MILLISECONDSINADAY && !isSameDay(start, end)) {
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

export function passJSDateToDatetime(date: Date): Date {
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

export function findDay(date: Date): Weekday | null {
  const daysOfTheWeek = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU]
  const day = getDay(date)
  for (let dayOfTheWeek of daysOfTheWeek) {
    if (dayOfTheWeek.getJsWeekday() === day) return dayOfTheWeek
  }
  return null
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
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return // there shouldn't be events w/o recurrences in here but this is needed as a type guard
    const duration = event.endDate.getTime() - event.startDate.getTime()
    const occurrences = getEventOccurrencesByDay(duration, date, event.recurring)
    if (!occurrences) return
    occurrences.forEach(occurrence => {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrence)
      const recurredEndDate = new Date(recurredStartDate.getTime() + duration)
      const newEvt: Event = {
        ...event,
        startDate: recurredStartDate,
        endDate: recurredEndDate
      }
      eventArray.push(newEvt)
    });
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

export const checkIsHappening = (item: Event | Test): boolean => {
  const now = dayjs()
  return now.isBetween(item.startDate, item.endDate)
}

export function getActiveRecurrenceEvents(events: Event[]): Event[] {
  // Takes in an array of unconverted recurring Events and returns an array of JS-converted currently active Events (i.e. creates events with correct dates)
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return // there shouldn't be events w/o recurrences in here but this is needed as a type guard
    const duration = event.endDate.getTime() - event.startDate.getTime()
    // console.log(duration / 3600000)
    const occurrences = getOccurrencesThatTakePlaceBetweenLookbackAndRightNow(duration, event.recurring)
    if (!occurrences) return
    occurrences.forEach(occurrence => {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrence)
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
    });
  });
  return eventArray
}

// Upcoming Events

function getNextEventOccurrence(recurrence: string): Date[] | null {
  const now = new Date()
  const nowDT = passJSDateToDatetime(now)
  const aDayFromNow = addDays(now, 1)
  const aDayFromNowDT = passJSDateToDatetime(aDayFromNow)
  const occurrences = rrulestr(recurrence).between(nowDT, aDayFromNowDT, false)
  return occurrences
}

export function getUpNextRecurrenceEvents(events: Event[]): Event[] {
  const eventArray: Event[] = []
  events.forEach(event => {
    if (!event.recurring) return
    const duration = event.endDate.getTime() - event.startDate.getTime()
    const occurrences = getNextEventOccurrence(event.recurring)
    if (!occurrences) return
    occurrences.forEach(occurrence => {
      const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrence)
      const recurredEndDate = new Date(recurredStartDate.getTime() + duration)
      const newEvt: Event = {
        ...event,
        startDate: recurredStartDate,
        endDate: recurredEndDate
      }
      eventArray.push(newEvt)
    })
  });
  return eventArray
}

export function getUpNextScheduleItems(items: (Event | Test)[]): (Event | Test)[] | null {
  const upNextItems: (Event | Test)[] = []
  const upNext = items.shift()
  if (!upNext) return null
  upNextItems.push(upNext)
  for (let item of items) {
    if (isEqual(item.startDate, upNext?.startDate)) {
      const item = items.shift()
      if (item !== undefined) upNextItems.push(item)
    }
    else {
      break
    }
  }
  return upNextItems
}