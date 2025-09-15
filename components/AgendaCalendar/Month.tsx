import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { startOfMonth, addDays, subDays, getDay, getDaysInMonth, format, isSameMonth, isSameDay, eachDayOfInterval } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Day from '@/components/AgendaCalendar/Day'

import { useAssignmentsByDateRange, useEventsByDateRange, useTasksByDateRange } from '@/hooks/useDatabase';
import { getOccurrencesBetweenDays } from '@/utils/event';
import { pretty } from '@/utils';
import { Assignment, Event, Task } from '@/types';

type MonthProps = {
  initialDay: Date
  selectedDatePosition: SharedValue<number>
  setCalendarBottom: (y: number) => void
}

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default function Month({ initialDay, selectedDatePosition, setCalendarBottom }: MonthProps) {
  const insets = useSafeAreaInsets()
  let paddingTop = 0;
  if (Platform.OS === 'android') {
    paddingTop = 0
  }
  else if (Platform.OS === 'ios') {
    paddingTop = insets.top
  }

  const rawDates = useMemo(() => {
    const numDaysInMonth = getDaysInMonth(initialDay)
    let firstOfMonth = startOfMonth(initialDay)
    let rawDates: Date[] = []
    for (let i = 0; i < numDaysInMonth; i++) {
      rawDates.push(addDays(firstOfMonth, i))
    }

    // Start padding
    const padStart = getDay(firstOfMonth)
    for (let i = 1; i <= padStart; i++) {
      rawDates.unshift(subDays(firstOfMonth, i))
    }

    // End padding
    while (rawDates.length < 42) {
      const last = rawDates[rawDates.length - 1]
      rawDates.push(addDays(last, 1))
    }
    return rawDates
  }, [initialDay])

  const start = rawDates[0];
  const end = rawDates[rawDates.length - 1];

  const events: Event[] = useEventsByDateRange(start, end);
  const assignments: Assignment[] = useAssignmentsByDateRange(start, end);
  const tasks: Task[] = useTasksByDateRange(start, end);

  const items = useMemo(() => [...events, ...assignments, ...tasks], [events, assignments, tasks]);

  const map: Record<string, number> = useMemo(function () {
    const m: Record<string, number> = {}
    items.forEach(item => {
      if ('recurring' in item && item.recurring !== undefined) {
        const occurrences = getOccurrencesBetweenDays(item.recurring, start, end)
        occurrences.forEach(occurrence => {
          const key = (format(occurrence, 'yyyy-MM-dd'))
          m[key] = (m[key] || 0) + 1
        })
      }
      // If item is an activity
      else if ('due' in item && item.due instanceof Date) {
        const dateToUse = item.due;
        const key = format(dateToUse, 'yyyy-MM-dd')
        m[key] = (m[key] || 0) + 1
      }
      // Item is an event
      else if ('startDate' in item && 'endDate' in item && item.startDate instanceof Date && item.endDate instanceof Date) {
        // If the event is crossover or multiday
        if (!isSameDay(item.startDate, item.endDate)) {
          const dates = eachDayOfInterval({ start: item.startDate, end: item.endDate })
          dates.forEach(date => {
            const key = format(date, 'yyyy-MM-dd')
            m[key] = (m[key] || 0) + 1
          });
        }
        // If item is a regular event
        else {
          const dateToUse = item.endDate;
          const key = format(dateToUse, 'yyyy-MM-dd')
          m[key] = (m[key] || 0) + 1
        }
      }
    })
    return m
  }, [items])

  const days = useMemo(() => {
    return rawDates.map(date => {
      const key = date.toDateString()
      const dateKey = format(date, 'yyyy-MM-dd')
      const count = map[dateKey] || 0
      const isInactive = !isSameMonth(date, initialDay)
      return (
        <Day
          key={key}
          date={date}
          isInactive={isInactive}
          count={count}
          paddingTop={paddingTop}
          selectedDatePosition={selectedDatePosition}
          // onPress={() => useCalendarState.getState().selectDate(date)}
          firstDay={initialDay}
          dayType='month'
        />
      )
    })
  }, [map])

  const weeks = useMemo(() => chunk(days, 7), [days])

  return (
    <View style={[styles.container]}>
      <View style={styles.weeks}>
        {weeks.map((week, index) => (
          <View key={index} style={styles.week}>
            {week}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //  30 (size of header) + 5 (header margin) + 17 (weekday name text height) = 52
    // paddingTop: 52,
    width: '100%',
  },
  week: {
    flexDirection: 'row',
  },
  weeks: {},
})