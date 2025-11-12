import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SymbolView } from 'expo-symbols'
import { datetime, RRule } from 'rrule'

import { useTheme } from '@/hooks'
import { findDay } from '@/utils/scheduleItem'

import WeeklyPicker from '@/components/Form/Recurrence/WeeklyPicker'

type CourseRecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>;
  startDate: Date;
}

export default function CourseRecurrencePicker({ recurring, setRecurring, startDate }: CourseRecurrencePickerProps) {
  const theme = useTheme()
  const newRule = new RRule({
    dtstart: datetime(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds()),
    freq: RRule.WEEKLY,
    interval: 1,
    byweekday: findDay(startDate)
  })
  let rule = recurring ? RRule.fromString(recurring) : newRule
  useEffect(() => {
    setRecurring(rule.toString())
  }, [rule])
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>{"Repeat"}</Text>
      </View>
      <Text style={{ color: theme.text }}>{recurring || 'null recurrence string'}</Text>
      <WeeklyPicker start={startDate} rule={rule} setRecurring={setRecurring} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    gap: 16,
  },
  fieldText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})