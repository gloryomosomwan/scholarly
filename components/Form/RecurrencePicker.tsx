import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import { RRule } from 'rrule'

import RecFreqPicker from '@/components/Form/Recurrence/RecFreqPicker'
import IntervalCounter from '@/components/Form/Recurrence/IntervalCounter'
import WeeklyPicker from '@/components/Form/Recurrence/WeeklyPicker'

import { useTheme } from '@/hooks'
import { Frequency } from '@/types'

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
}

export default function RecurrencePicker({ recurring, setRecurring }: RecurrencePickerProps) {
  const theme = useTheme()
  const [frequency, setFrequency] = useState<Frequency>('once')
  const rule = recurring ? RRule.fromString(recurring) : new RRule()

  useEffect(() => {
    switch (frequency) {
      case 'once':
        setRecurring(null);
        break;
      case 'daily':
        setRecurring(new RRule({ freq: RRule.DAILY, interval: 1 }).toString());
        break;
      case 'weekly':
        setRecurring(new RRule({ freq: RRule.WEEKLY, interval: 1 }).toString());
        break;
      case 'monthly':
        setRecurring(new RRule({ freq: RRule.MONTHLY, interval: 1 }).toString());
        break;
    }
  }, [frequency])

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>Repeat</Text>
      </View>
      <Text style={{ color: 'white' }}>{recurring}</Text>
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