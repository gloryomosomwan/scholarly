import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { addDays, format, startOfWeek } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useItemsByDateRange } from '@/hooks/useDatabase';
import { getItemMap } from '@/utils/calendar';

import Day from '@/components/AgendaCalendar/Day'

type WeekProps = {
  initialDay: Date
  selectedDatePosition: SharedValue<number>
}

export default function Week({ initialDay, selectedDatePosition }: WeekProps) {
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'ios' ? insets.top : 0

  const rawDates = useMemo(() => {
    let firstDayOfWeek = startOfWeek(initialDay)
    let rawDates: Date[] = []
    for (let i = 0; i < 7; i++) {
      rawDates.push(addDays(firstDayOfWeek, i))
    }
    return rawDates
  }, [initialDay])

  const start = rawDates[0];
  const end = rawDates[rawDates.length - 1];
  const items = useItemsByDateRange(start, end)
  const map: Record<string, number> = useMemo(() => getItemMap(items, start, end), [items])

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