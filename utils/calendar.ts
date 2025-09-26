import { eachDayOfInterval, isEqual, startOfDay, format } from "date-fns"
import { getEventOccurrencesBetweenDays, convertRRuleOccurrenceToJSDate, getEventClass } from "@/utils/event"
import { Event, Assignment, Task } from "@/types"

export function getItemMap(items: (Event | Assignment | Task)[], start: Date, end: Date) {
  const m: Record<string, number> = {}
  items.forEach(item => {
    if ('recurring' in item && item.recurring !== undefined) {
      const occurrences = getEventOccurrencesBetweenDays(item.recurring, start, end)
      if (occurrences) {
        occurrences.forEach(occurrence => {
          const duration = item.endDate.getTime() - item.startDate.getTime()
          const recurredStartDate = convertRRuleOccurrenceToJSDate(occurrence)
          const recurredEndDate = new Date(recurredStartDate.getTime() + duration)
          const dates = eachDayOfInterval({ start: recurredStartDate, end: recurredEndDate })
          if (isEqual(item.endDate, startOfDay(item.endDate))) dates.splice(dates.length - 1)
          dates.forEach(date => {
            const key = format(date, 'yyyy-MM-dd')
            m[key] = (m[key] || 0) + 1
          });
        })
      }
    }
    // If item is an activity
    else if ('due' in item && item.due instanceof Date) {
      const dateToUse = item.due;
      const key = format(dateToUse, 'yyyy-MM-dd')
      m[key] = (m[key] || 0) + 1
    }
    // Item is an event
    else if ('startDate' in item && 'endDate' in item && item.startDate instanceof Date && item.endDate instanceof Date) {
      if (getEventClass(item.startDate, item.endDate) !== 'regular') {
        const dates = eachDayOfInterval({ start: item.startDate, end: item.endDate })
        // If the event ends at midnight, remove the day representing the end date from the dates array
        if (isEqual(item.endDate, startOfDay(item.endDate))) dates.splice(dates.length - 1)
        dates.forEach(date => {
          const key = format(date, 'yyyy-MM-dd')
          m[key] = (m[key] || 0) + 1
        });
      }
      else {
        const dateToUse = item.endDate;
        const key = format(dateToUse, 'yyyy-MM-dd')
        m[key] = (m[key] || 0) + 1
      }
    }
  })
  return m
}
