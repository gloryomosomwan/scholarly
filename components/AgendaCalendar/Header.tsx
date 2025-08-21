import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import HeatmapButton from '@/components/AgendaCalendar/HeatmapButton';
import { useCalendarAppearance } from '@/components/AgendaCalendar/CalendarAppearanceContext';

import { useTheme } from '@/hooks'
import { useCalendarStore } from '@/stores/calendar';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Header() {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'android' ? 0 : insets.top
  const { isGradientBackground } = useCalendarAppearance()
  const selectedDate = useCalendarStore((state) => state.currentDate)
  const subduedTextColor = isGradientBackground ? '#f7f7f7' : theme.grey400
  return (
    <View style={[styles.container, { paddingTop: paddingTop, backgroundColor: 'undefined' }]}>
      <View style={styles.topRowContainer}>
        <View style={styles.monthTextContainer}>
          <Text style={[styles.monthNameText, { color: isGradientBackground ? 'white' : theme.text }]}>{selectedDate.toLocaleString('default', { month: 'long', })}</Text>
          <Text style={[styles.monthYearText, { color: subduedTextColor }]}>{selectedDate.toLocaleString('default', { year: 'numeric' })}</Text>
        </View>
        <HeatmapButton />
      </View>
      <View style={styles.weekdayNamesContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={[styles.dayNameText, { color: isGradientBackground ? 'white' : theme.text }]}>{day}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  monthNameText: {
    fontSize: 25,
    textAlign: 'center',
    marginRight: 3,
  },
  monthYearText: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: 3,
  },
  monthTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  weekdayNamesContainer: {
    flexDirection: 'row',
  },
  dayNameText: {
    textAlign: 'center',
    width: Dimensions.get('window').width / 7,
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
})