import { Platform, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { startOfMonth, addDays, subDays, getDay, getDaysInMonth, format, isSameMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { events, assignments, tasks, exams } from '@/data/data';
import Day from './Day'

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
  // const dates = getDates(initialDay)
  // const paddedDates = padDatesArray(dates)
  // const daysArray = createDays(paddedDates, initialDay, selectedDatePosition)
  // const weeks = createWeeks(daysArray)
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
      ;[...events, ...tasks, ...assignments, ...exams].forEach(item => {
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
  }, [events, tasks, assignments, exams])


  const days = useMemo(() => {
    const numDaysInMonth = getDaysInMonth(initialDay)
    let firstOfMonth = startOfMonth(initialDay)
    let rawDates: Date[] = []
    // let currentDay = firstDay
    for (let i = 0; i < numDaysInMonth; i++) {
      // rawDates.push(currentDay)
      // currentDay = addDays(currentDay, 1)
      rawDates.push(addDays(firstOfMonth, i))
    }

    // Start padding
    const padStart = getDay(firstOfMonth)
    for (let i = padStart; i > 0; i--) {
      rawDates.unshift(subDays(firstOfMonth, i))
    }

    // End padding
    while (rawDates.length < 42) {
      const last = rawDates[rawDates.length - 1]
      rawDates.push(addDays(last, 1))
    }

    return rawDates.map(date => {
      const key = date.toDateString()
      const dateKey = format(date, 'yyyy-MM-dd')
      const count = itemsByDate[dateKey] || 0
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

  }, [initialDay, itemsByDate, selectedDatePosition, paddingTop])

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

// function getDates(initialDay: Date) {
//   const numDaysInMonth = getDaysInMonth(initialDay)
//   let firstDay = startOfMonth(initialDay)
//   let dates = []
//   let currentDay = firstDay
//   for (let i = 0; i < numDaysInMonth; i++) {
//     dates.push(currentDay)
//     currentDay = addDays(currentDay, 1)
//   }
//   return dates
// }

// function createDays(dates: Date[], initialDay: Date, selectedDatePosition: SharedValue<number>) {
//   let days: JSX.Element[] = []
//   dates.map((date) => {
//     days.push(
//       <Day key={date.toDateString()}
//         date={date}
//         firstDayOfMonth={initialDay}
//         selectedDatePosition={selectedDatePosition}
//         dayType='month'
//       />
//     )
//   })
//   return days
// }

// function padDatesArray(dates: Date[]) {
//   let firstDay = dates[0]
//   let dayOfFirstDay = getDay(dates[0])
//   let i = dayOfFirstDay
//   let currentDay = firstDay
//   while (i > 0) {
//     currentDay = subDays(currentDay, 1)
//     dates.unshift(currentDay)
//     i--
//   }
//   let lastDay = dates[dates.length - 1]
//   while (dates.length < 42) {
//     lastDay = addDays(lastDay, 1)
//     dates.push(lastDay)
//   }
//   return dates
// }

// function createWeeks(daysArray: React.ReactNode[]) {
//   let weeks = []
//   for (let i = 0; i < 6; i++) {
//     let week = []
//     for (let j = 0; j < 7; j++) {
//       let day = daysArray.shift()
//       week.push(day)
//     }
//     weeks.push(week)
//   }
//   return weeks
// }

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