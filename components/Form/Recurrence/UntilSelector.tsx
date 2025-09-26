import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addWeeks } from 'date-fns';
import { SymbolView } from 'expo-symbols';
import { RRule } from 'rrule';

import { useTheme } from '@/hooks/useTheme'
import { passJSDateToDatetime } from '@/utils/event';

import PressableOpacity from '@/components/Buttons/PressableOpacity'

type UntilSelectorProps = {
  rule: RRule
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
  start: Date
}

export default function UntilSelector({ rule, setRecurring, start }: UntilSelectorProps) {
  const theme = useTheme()
  const until = rule.options.until
  const [hasUntil, setHasUntil] = useState<boolean>(until ? true : false)
  const n = addWeeks(new Date(), 1).setHours(start.getHours(), start.getMinutes(), 0)
  const [internalDate, setInternalDate] = useState(until || new Date(n))

  useEffect(() => {
    const d = new Date()
    d.setHours(start.getHours(), start.getMinutes(), 0)
    const newRule = new RRule({
      freq: rule.options.freq,
      dtstart: rule.options.dtstart,
      interval: rule.options.interval,
      byweekday: rule.options.byweekday,
      until: passJSDateToDatetime(d)
    })
    setRecurring(newRule.toString())
  }, [start])

  function handlePickerChange(event: DateTimePickerEvent, selectedDate?: Date): void {
    if (event.type === 'dismissed') return
    const currentDate = selectedDate || internalDate;
    currentDate.setHours(start.getHours(), start.getMinutes())
    const newRule = new RRule({
      freq: rule.options.freq,
      dtstart: rule.options.dtstart,
      interval: rule.options.interval,
      byweekday: rule.options.byweekday,
      until: passJSDateToDatetime(currentDate)
    })
    setRecurring(newRule.toString())
  }

  function activate(): void {
    setHasUntil(true)
    const newRule = new RRule({
      freq: rule.options.freq,
      dtstart: rule.options.dtstart,
      interval: rule.options.interval,
      byweekday: rule.options.byweekday,
      until: passJSDateToDatetime(internalDate)
    })
    setRecurring(newRule.toString())
  }

  function clear() {
    const newRule = new RRule({
      freq: rule.options.freq,
      dtstart: rule.options.dtstart,
      interval: rule.options.interval,
      byweekday: rule.options.byweekday,
    })
    setInternalDate(new Date(n))
    setRecurring(newRule.toString())
    setHasUntil(false)
  }

  return (
    <View>
      {
        hasUntil ?
          <View style={[styles.container, {}]}>
            <Text style={[styles.text, { color: theme.text }]}>End Date</Text>
            <View style={[styles.rightSide, {}]}>
              <DateTimePicker
                testID="datePicker"
                value={internalDate}
                mode={'date'}
                display={'compact'}
                onChange={handlePickerChange}
                accentColor={theme.accent}
              />
              <PressableOpacity style={[styles.clearButton, { backgroundColor: theme.grey200 }]} onPress={clear}>
                <SymbolView name='xmark' size={15} tintColor={theme.grey400} />
              </PressableOpacity>
            </View>
          </View>
          :
          <PressableOpacity style={[styles.button, { backgroundColor: theme.grey200 }]} onPress={activate}>
            < Text style={[styles.text, { color: theme.text }]} > Set End Date</Text >
          </PressableOpacity >
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 15
  },
  clearButton: {
    padding: 8,
    borderRadius: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  }
})