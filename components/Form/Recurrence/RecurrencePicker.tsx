import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'
import { RRule } from 'rrule'

import { useTheme } from '@/hooks'

import RecFreqPicker from '@/components/Form/Recurrence/RecFreqPicker'
import IntervalCounter from '@/components/Form/Recurrence/IntervalCounter'
import WeeklyPicker from '@/components/Form/Recurrence/WeeklyPicker'
import UntilSelector from '@/components/Form/Recurrence/UntilSelector'

type RecurrencePickerProps = {
  recurring: string | null;
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>;
  startDate: Date;
}

export default function RecurrencePicker({ recurring, setRecurring, startDate }: RecurrencePickerProps) {
  const theme = useTheme()
  const rule = recurring ? RRule.fromString(recurring) : new RRule()
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <SymbolView name={'repeat'} tintColor={theme.grey500} size={24} />
        <Text style={[styles.fieldText, { color: theme.grey500 }]}>{"Repeat"}</Text>
      </View>
      <Text style={{ color: theme.text }}>{recurring || 'null recurrence string'}</Text>
      <Text style={{ color: theme.text }}>{rule.options.until?.toISOString() || 'null until value'}</Text>
      <RecFreqPicker setRecurring={setRecurring} rule={rule} startDate={startDate} recurring={recurring} />
      {recurring !== null && <IntervalCounter rule={rule} start={startDate} setRecurring={setRecurring} />}
      {rule.options.freq === RRule.WEEKLY && <WeeklyPicker start={startDate} rule={rule} setRecurring={setRecurring} />}
      {recurring !== null && <UntilSelector start={startDate} rule={rule} setRecurring={setRecurring} />}
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