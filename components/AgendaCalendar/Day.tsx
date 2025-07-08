import { StyleSheet, Text, View, Pressable, Dimensions, Platform, useColorScheme } from 'react-native'
import React, { useRef, useLayoutEffect, useEffect, useState, memo, useMemo } from 'react'
import { isSameMonth, isSameDay, getWeekOfMonth, isSameWeek } from 'date-fns'
import { SharedValue } from 'react-native-reanimated';

import { useCalendar } from './CalendarContext';
import { useTheme } from '@/hooks';
import { useCalendarAppearance } from './CalendarAppearanceContext'

type DayType = 'week' | 'month'

type DayProps = {
  date: Date;
  selectedDatePosition: SharedValue<number>
  dayType: DayType
  isSelected: boolean
  isInactive: boolean
  // hasItems: boolean
  count: number
  paddingTop: number
  // onPress
}

const MAX_ITEMS = 5
const map01to08 = (t: number) => t * 0.9;

export default function Day({ date, selectedDatePosition, dayType, isSelected, isInactive, count, paddingTop }: DayProps) {
  const { calendarState } = useCalendar()
  const { heatmapActive, isGradientBackground } = useCalendarAppearance()
  const [selectedDate, setSelectedDate] = useState(calendarState.currentDate)
  const elementRef = useRef<View | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const unsubscribe = calendarState.weekSubscribe(() => {
      if (isSameWeek(date, calendarState.currentDate) || isSameWeek(date, calendarState.previousDate)) {
        setSelectedDate(calendarState.currentDate)
      }
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    const unsubscribe = calendarState.monthSubscribe(() => {
      if (isSameDay(date, calendarState.currentDate) || isSameDay(date, calendarState.previousDate)) {
        setSelectedDate(calendarState.currentDate)
      }
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    if (dayType === 'week') {
      const dayUnsubscribe = calendarState.daySubscribe(() => {
        if (isSameMonth(date, calendarState.currentDate) || isSameMonth(date, calendarState.previousDate)) {
          setSelectedDate(calendarState.currentDate)
        }
      })
      return dayUnsubscribe
    }
    else {
      const dayUnsubscribe = calendarState.daySubscribe(() => {
        if (isSameDay(date, calendarState.currentDate) || isSameDay(date, calendarState.previousDate)) {
          setSelectedDate(calendarState.currentDate)
        }
      })
      return dayUnsubscribe
    }
  }, [])

  useEffect(() => {
    const todayUnsubscribe = calendarState.todaySubscribe(() => {
      if (isSameDay(date, calendarState.currentDate) || isSameDay(date, calendarState.previousDate))
        setSelectedDate(calendarState.currentDate)
    })
    return todayUnsubscribe
  }, [])

  useLayoutEffect(() => {
    if (isSameDay(date, selectedDate) && isSelected) {
      selectedDatePosition.value = (paddingTop + 52) + (47 * (getWeekOfMonth(date) - 1))
    }
  })

  const onPress = () => {
    calendarState.selectPreviousDate(calendarState.currentDate)
    calendarState.daySelectDate(date)
  }

  // const eventsOnThisDate = events.filter((event) => isSameDay(event.start, date))

  const opacityPct = map01to08((count / MAX_ITEMS))

  const scheme = useColorScheme() ?? 'light'
  const darkThemeText = theme.text
  const lightThemeText = heatmapActive || isGradientBackground ? theme.inverseText : theme.text
  const subduedTextColor = isGradientBackground || scheme === 'dark' ? { color: 'white', opacity: 0.5 } : { color: theme.grey400 }

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container} ref={elementRef}>
        {isSelected && !heatmapActive && <View style={[styles.selectedDateCircle, { backgroundColor: theme.accent }]} />}
        {isSelected && heatmapActive && <View style={[styles.heatmapSelectedDayCircle, { borderColor: theme.accent }]} />}
        {heatmapActive && !isInactive && <View style={[styles.heatmapCircle, { backgroundColor: theme.accent, opacity: 0.1 + opacityPct }]} />}
        <Text
          style={[
            styles.text,
            { color: scheme === 'light' ? lightThemeText : darkThemeText },
            scheme === 'light' && isSelected && { color: theme.inverseText },
            isInactive && subduedTextColor
          ]}>
          {date.getDate()}
        </Text>
        {count > 0 && !heatmapActive && !isSelected && <View style={{ height: 6, width: 6, borderRadius: 6, backgroundColor: 'white', opacity: 0.5, position: 'absolute', bottom: 4 }} />}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    width: Dimensions.get('window').width / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedDateCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 34,
    height: 34,
    borderRadius: 100
  },
  heatmapCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 34,
    height: 34,
    borderRadius: 100,
    margin: 8
  },
  heatmapSelectedDayCircle: {
    position: 'absolute',
    zIndex: -1,
    width: 43,
    height: 43,
    borderRadius: 100,
    borderWidth: 2
  },
})