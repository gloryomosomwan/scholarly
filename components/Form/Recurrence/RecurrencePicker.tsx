import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import { datetime, RRule, Frequency } from 'rrule'

import RecFreqPicker from '@/components/Form/Recurrence/RecFreqPicker'
import IntervalCounter from '@/components/Form/Recurrence/IntervalCounter'
import WeeklyPicker from '@/components/Form/Recurrence/WeeklyPicker'
import UntilSelector from '@/components/Form/Recurrence/UntilSelector'

import { useTheme } from '@/hooks'

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>;
  startDate: Date;
}

export default function RecurrencePicker({ recurring, setRecurring, startDate }: RecurrencePickerProps) {
  const theme = useTheme()
  const rule = recurring ? RRule.fromString(recurring) : new RRule()
  const [frequency, setFrequency] = useState<Frequency | undefined>(recurring ? rule.options.freq : undefined)
  const [interval, setInterval] = useState<number>(rule ? rule.options.interval : 1)

  useEffect(() => {
    if (!frequency) {
      setRecurring(null)
      return
    }
    const dtstart = datetime(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds())
    const until = rule ? rule.options.until : undefined
    const byweekday = rule.options.byweekday
    const newRule = new RRule({
      dtstart: dtstart,
      interval: interval,
      freq: frequency,
      until: until,
      byweekday: frequency === RRule.WEEKLY ? byweekday : null
    })
    setRecurring(newRule.toString())
  }, [frequency, startDate, interval])

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>Repeat</Text>
      </View>
      <Text style={{ color: theme.text }}>{recurring || 'null'}</Text>
      <RecFreqPicker frequency={frequency} setFrequency={setFrequency} />
      {frequency && <IntervalCounter interval={interval} setInterval={setInterval} />}
      {frequency === RRule.WEEKLY && <WeeklyPicker start={startDate} rule={rule} setRecurring={setRecurring} />}
      {frequency && <UntilSelector rule={rule} setRecurring={setRecurring} start={startDate} />}
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