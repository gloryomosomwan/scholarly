import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { addDays, format, startOfWeek } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Day from '@/components/AgendaCalendar/Day'

import { useEventsByDateRange } from '@/hooks/useDatabase';

type WeekProps = {
  initialDay: Date
  selectedDatePosition: SharedValue<number>
}

export default function Week({ initialDay, selectedDatePosition }: WeekProps) {
  const insets = useSafeAreaInsets()

  let paddingTop = 0;
  if (Platform.OS === 'android') {
    paddingTop = 0
  }
  else if (Platform.OS === 'ios') {
    paddingTop = insets.top
  }

  const rawDates = useMemo(() => {
    let firstDayOfWeek = startOfWeek(initialDay)
    let rawDates: Date[] = []
    for (let i = 0; i < 7; i++) {
      rawDates.push(addDays(firstDayOfWeek, i))
    }
    return rawDates
  }, [initialDay])

  const map: Record<string, number> = {}
  const items = [
    ...useEventsByDateRange(rawDates[0], rawDates[rawDates.length - 1]),
    // ...useAssignmentsByMonth(rawDates[0], rawDates[rawDates.length - 1]),
    // ...useTasksByMonth(rawDates[0], rawDates[rawDates.length - 1])
  ]
  items.forEach(item => {
    let dateToUse: Date | undefined;

    if ('startDate' in item && item.startDate instanceof Date) {
      dateToUse = item.startDate;
    } else if ('due' in item && item.due instanceof Date) {
      dateToUse = item.due;
    }

    if (dateToUse) {
      const key = format(dateToUse, 'yyyy-MM-dd')
      map[key] = (map[key] || 0) + 1
    }
  })

  const days = useMemo(() => {
    return rawDates.map(date => {
      const key = date.toDateString() + 'week'
      const dateKey = format(date, 'yyyy-MM-dd')
      const count = map[dateKey] || 0
      return (
        <Day
          key={key}
          date={date}
          count={count}
          paddingTop={paddingTop}
          selectedDatePosition={selectedDatePosition}
          firstDay={initialDay}
          dayType='week'
        />
      )
    })
  }, [map])

  return (
    <View style={styles.container}>
      {days}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
})