import { StyleSheet, Text, View, Pressable, Dimensions, useColorScheme } from 'react-native'
import React, { useRef, useLayoutEffect } from 'react'
import { isSameMonth, isSameDay, getWeekOfMonth } from 'date-fns'
import { SharedValue } from 'react-native-reanimated';

import { useCalendarStore } from '@/stores/CalendarState';
import { useTheme } from '@/hooks';
import { useCalendarAppearance } from './CalendarAppearanceContext'

type DayType = 'week' | 'month'

type DayProps = {
  date: Date;
  selectedDatePosition: SharedValue<number>
  dayType: DayType
  isInactive?: boolean // Optional because is static (can be passed in) for Month Days but not for Week Days
  count: number
  paddingTop: number
  firstDay: Date;
}

const MAX_ITEMS = 5
const map01to08 = (t: number) => t * 0.9;

export default function Day({ date, selectedDatePosition, dayType, count, paddingTop, firstDay }: DayProps) {
  const isSelected = useCalendarStore(state => (dayType === 'week' && isSameDay(date, state.currentDate)) || (dayType === 'month' && isSameDay(date, state.currentDate) && isSameMonth(date, firstDay)));

  // let weekDayInactive;
  // if (dayType === 'week') {
  //   weekDayInactive = useCalendarStore(state => !isSameMonth(date, state.currentDate))
  // }

  // A week Day can be active even if it isn't in the same month as the first Day of its week
  const isInactive = useCalendarStore(state => (dayType === 'week' && !isSameMonth(date, state.currentDate) || (dayType === 'month' && !isSameMonth(date, firstDay))))

  const daySelectDate = useCalendarStore(state => state.daySelectDate);
  const selectPreviousDate = useCalendarStore(state => state.selectPreviousDate);

  const { heatmapActive, isGradientBackground } = useCalendarAppearance()
  const elementRef = useRef<View | null>(null)
  const theme = useTheme()
  const opacityPct = map01to08((count / MAX_ITEMS))
  const scheme = useColorScheme() ?? 'light'
  const darkThemeText = theme.text
  const lightThemeText = heatmapActive || isGradientBackground ? theme.inverseText : theme.text
  const subduedTextColor = isGradientBackground || scheme === 'dark' ? { color: 'white', opacity: 0.5 } : { color: theme.grey400 }

  useLayoutEffect(() => {
    if (isSelected) {
      selectedDatePosition.value = (paddingTop + 52) + (47 * (getWeekOfMonth(date) - 1))
    }
  }, [date, isSelected, paddingTop, selectedDatePosition])

  const onPress = () => {
    // const currentGlobalDate = useCalendarStore.getState().currentDate;
    // selectPreviousDate(currentGlobalDate);
    // daySelectDate(date);
  }

  return (
    <Pressable onPress={onPress} style={styles.container} ref={elementRef}>
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