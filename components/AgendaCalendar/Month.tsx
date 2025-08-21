import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { startOfMonth, addDays, subDays, getDay, getDaysInMonth, format, isSameMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Day from '@/components/AgendaCalendar/Day'

import { useEventsByMonth } from '@/hooks/useDatabase';

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

  const map: Record<string, number> = {}
  useEventsByMonth(rawDates[0], rawDates[rawDates.length - 1]).forEach(item => {
    let dateToUse: Date | undefined;

    if ('startDate' in item && item.startDate instanceof Date) {
      dateToUse = item.startDate;
    }
    // else if ('due' in item && item.due instanceof Date) {
    //   dateToUse = item.due;
    // }

    if (dateToUse) {
      const key = format(dateToUse, 'yyyy-MM-dd')
      map[key] = (map[key] || 0) + 1
    }
  })

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