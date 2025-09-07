import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import { datetime, RRule } from 'rrule'

import RecFreqPicker from '@/components/Form/Recurrence/RecFreqPicker'
import IntervalCounter from '@/components/Form/Recurrence/IntervalCounter'
import WeeklyPicker from '@/components/Form/Recurrence/WeeklyPicker'

import { useTheme } from '@/hooks'
import { Frequency } from '@/types'

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>;
  startDate: Date | null;
}

export default function RecurrencePicker({ recurring, setRecurring, startDate }: RecurrencePickerProps) {
  const theme = useTheme()
  const [frequency, setFrequency] = useState<Frequency>('once')
  const rule = recurring ? RRule.fromString(recurring) : new RRule()

  useEffect(() => {
    const selectedDatetime = datetime(startDate ? startDate.getUTCFullYear() : 0, startDate ? startDate.getUTCMonth() : 0, startDate ? startDate.getUTCDate() : 0, startDate ? startDate.getUTCHours() : 0, startDate ? startDate.getUTCMinutes() : 0, startDate ? startDate.getUTCSeconds() : 0)
    const defaultInterval = 1
    switch (frequency) {
      case 'once':
        setRecurring(null);
        break;
      case 'daily':
        setRecurring(new RRule({ freq: RRule.DAILY, dtstart: selectedDatetime, interval: defaultInterval }).toString());
        break;
      case 'weekly':
        setRecurring(new RRule({ freq: RRule.WEEKLY, dtstart: selectedDatetime, interval: defaultInterval }).toString());
        break;
      case 'monthly':
        setRecurring(new RRule({ freq: RRule.MONTHLY, dtstart: selectedDatetime, interval: defaultInterval }).toString());
        break;
    }
  }, [frequency, startDate])

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>Repeat</Text>
      </View>
      <Text style={{ color: theme.text }}>{recurring}</Text>
      <RecFreqPicker frequency={frequency} setFrequency={setFrequency} />
      {frequency !== 'once' && <IntervalCounter rule={rule} setRecurring={setRecurring} />}
      {frequency === 'weekly' && <WeeklyPicker rule={rule} setRecurring={setRecurring} />}
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