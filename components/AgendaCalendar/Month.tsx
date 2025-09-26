import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { startOfMonth, addDays, subDays, getDay, getDaysInMonth, format, isSameMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useItemsByDateRange } from '@/hooks/useDatabase';
import { pretty } from '@/utils';
import { countMap } from '@/utils/calendar';

import Day from '@/components/AgendaCalendar/Day'

type MonthProps = {
  initialDay: Date
  selectedDatePosition: SharedValue<number>
  setCalendarBottom: (y: number) => void
}

export default function Month({ initialDay, selectedDatePosition, setCalendarBottom }: MonthProps) {
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'ios' ? insets.top : 0

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
  const items = useItemsByDateRange(start, end)
  const map: Record<string, number> = useMemo(() => countMap(items, start, end), [items])

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

  function chunk<T>(array: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

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