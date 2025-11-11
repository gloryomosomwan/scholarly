import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import { RRule, rrulestr } from 'rrule'

import { useTheme } from '@/hooks/useTheme'

import Day from '@/components/CoursePage/CourseEventCard/Recurrence/Day'

type RecurrenceProps = {
  recurrence: string
}

const daysOfTheWeek = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU]

export default function Recurrence({ recurrence }: RecurrenceProps) {
  const theme = useTheme()
  const rule = rrulestr(recurrence)
  const weekdays = rule.options.byweekday
  return (
    <View style={styles.detailRow}>
      <SymbolView name="calendar" size={16} tintColor={theme.grey600} />
      <Text style={[styles.detailText, { color: theme.grey600 }]}>{"Every Week"}</Text>
      <View style={styles.dayContainer}>
        {daysOfTheWeek.map((day) => {
          return <Day key={day.toString()} value={day} selected={weekdays.includes(day.weekday)} />
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
    marginLeft: 10
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})