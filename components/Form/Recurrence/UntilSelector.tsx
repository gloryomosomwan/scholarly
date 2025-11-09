import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addWeeks } from 'date-fns';
import { datetime, RRule } from 'rrule';

import { useTheme } from '@/hooks/useTheme'
import { passJSDateToDatetime } from '@/utils/scheduleItem';

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import ClearButton from '@/components/Buttons/ClearButton';

type UntilSelectorProps = {
  start: Date
  rule: RRule
  setRecurring: React.Dispatch<React.SetStateAction<string | null>>
}

export default function UntilSelector({ start, rule, setRecurring }: UntilSelectorProps) {
  const theme = useTheme()
  const aWeekFromNow = addWeeks(new Date(), 1).setHours(start.getHours(), start.getMinutes(), 0)
  const until = rule?.options.until
  const [internalDate, setInternalDate] = useState(until || new Date(aWeekFromNow))
  const [skippedAdjust, setSkippedAdjust] = useState(false)

  useEffect(() => {
    setInternalDate(until || new Date(aWeekFromNow))
  }, [until])

  function setUntil(unt: Date | null) {
    const dtstart = datetime(start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds())
    const newRule = new RRule({
      dtstart: dtstart,
      interval: rule.options.interval,
      freq: rule.options.freq,
      until: unt,
      byweekday: rule.options.byweekday
    })
    setRecurring(newRule.toString())
  }

  useEffect(() => {
    if (!until) return
    if (!skippedAdjust) {
      setSkippedAdjust(true)
      return
    }
    const date = new Date(start)
    setUntil(passJSDateToDatetime(date))
  }, [start])

  function handlePickerChange(event: DateTimePickerEvent, selectedDate?: Date): void {
    if (event.type === 'dismissed') return
    const date = new Date(selectedDate || internalDate)
    date.setHours(start.getHours(), start.getMinutes())
    setUntil(passJSDateToDatetime(date))
  }

  function activate(): void {
    setUntil(passJSDateToDatetime(internalDate))
  }

  function clear() {
    setInternalDate(new Date(aWeekFromNow))
    setUntil(null)
  }

  return (
    <View>
      {
        until ?
          <View style={[styles.container, {}]}>
            <Text style={[styles.text, { color: theme.text }]}>{"End Date"}</Text>
            <View style={[styles.rightSide, {}]}>
              <DateTimePicker
                testID="datePicker"
                value={internalDate}
                mode={'date'}
                minimumDate={start}
                display={'compact'}
                onChange={handlePickerChange}
                accentColor={theme.accent}
              />
              <ClearButton onPress={clear} />
            </View>
          </View>
          :
          <PressableOpacity style={[styles.button, { backgroundColor: theme.grey200 }]} onPress={activate}>
            <Text style={[styles.text, { color: theme.text }]}>{"Set End Date"}</Text >
          </PressableOpacity>
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
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  }
})