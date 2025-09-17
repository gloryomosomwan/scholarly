import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import { datetime, RRule, Frequency } from 'rrule'

import RecFreqPicker from '@/components/Form/Recurrence/RecFreqPicker'
import IntervalCounter from '@/components/Form/Recurrence/IntervalCounter'
import WeeklyPicker from '@/components/Form/Recurrence/WeeklyPicker'

import { useTheme } from '@/hooks'

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>;
  startDate: Date;
}

export default function RecurrencePicker({ recurring, setRecurring, startDate }: RecurrencePickerProps) {
  const theme = useTheme()
  const rule = recurring ? RRule.fromString(recurring) : new RRule()
  const [frequency, setFrequency] = useState<Frequency | 'once'>(recurring ? rule.options.freq : 'once')

  useEffect(() => {
    const dtstart = datetime(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds())
    const interval = rule ? rule.options.interval : 1
    switch (frequency) {
      case 'once':
        setRecurring(null);
        break;
      case RRule.DAILY:
        setRecurring(new RRule({ freq: RRule.DAILY, dtstart: dtstart, interval: interval, count: 2 }).toString());
        break;
      case RRule.WEEKLY:
        setRecurring(new RRule({ freq: RRule.WEEKLY, dtstart: dtstart, interval: interval, byweekday: rule.options.byweekday, count: 2 }).toString());
        break;
      case RRule.MONTHLY:
        setRecurring(new RRule({ freq: RRule.MONTHLY, dtstart: dtstart, interval: interval }).toString());
        break;
    }
  }, [frequency, startDate])

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>Repeat</Text>
      </View>
      <Text style={{ color: theme.text }}>{recurring || 'null'}</Text>
      <RecFreqPicker frequency={frequency} setFrequency={setFrequency} />
      {frequency !== 'once' && <IntervalCounter rule={rule} setRecurring={setRecurring} />}
      {frequency === RRule.WEEKLY && <WeeklyPicker start={startDate} rule={rule} setRecurring={setRecurring} />}
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