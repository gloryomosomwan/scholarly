import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { addDays, format, startOfWeek } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { events, assignments, tasks, tests } from '@/data/data';
import Day from './Day'

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

  const itemsByDate = useMemo(() => {
    const map: Record<string, number> = {}
      ;[...events, ...tasks, ...assignments, ...tests].forEach(item => {
        let dateToUse: Date | undefined;

        if ('start' in item && item.start instanceof Date) {
          dateToUse = item.start;
        } else if ('due' in item && item.due instanceof Date) {
          dateToUse = item.due;
        }

        if (dateToUse) {
          const key = format(dateToUse, 'yyyy-MM-dd')
          map[key] = (map[key] || 0) + 1
        }
      })
    return map
  }, [events, tasks, assignments, tests])

  const days = useMemo(() => {
    let firstDayOfWeek = startOfWeek(initialDay)
    let rawDates: Date[] = []
    // let currentDay = firstDayOfWeek
    for (let i = 0; i < 7; i++) {
      // dates.push(currentDay)
      // currentDay = addDays(currentDay, 1)
      rawDates.push(addDays(firstDayOfWeek, i))
    }

    return rawDates.map(date => {
      const key = date.toDateString() + 'week'
      const dateKey = format(date, 'yyyy-MM-dd')
      const count = itemsByDate[dateKey] || 0
      return (
        <Day
          key={date.toDateString()}
          date={date}
          count={count}
          paddingTop={paddingTop}
          selectedDatePosition={selectedDatePosition}
          firstDay={initialDay}
          dayType='week'
        />
      )
    })
  }, [])

  // let days: JSX.Element[] = []
  // dates.map((date) => {
  //   days.push(
  //     <Day
  //       key={date.toDateString()}
  //       date={date}
  //       firstDay={initialDay}
  //       selectedDatePosition={selectedDatePosition}
  //       dayType='week'
  //     />
  //   )
  // })

  return (
    <View style={styles.container}>
      <View style={styles.days}>
        {days}
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {},
  days: {
    flexDirection: 'row'
  },
})