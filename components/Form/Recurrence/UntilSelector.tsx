import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addWeeks } from 'date-fns';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/hooks/useTheme'
import { passJSDateToDatetime } from '@/utils/event';

import PressableOpacity from '@/components/Buttons/PressableOpacity'
import ClearButton from '@/components/Buttons/ClearButton';

type UntilSelectorProps = {
  start: Date
  until: Date | null
  setUntil: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function UntilSelector({ start, until, setUntil }: UntilSelectorProps) {
  const theme = useTheme()
  const aWeekFromNow = addWeeks(new Date(), 1).setHours(start.getHours(), start.getMinutes(), 0)
  const [internalDate, setInternalDate] = useState(until || new Date(aWeekFromNow))

  useEffect(() => {
    if (!until) return
    const date = new Date()
    date.setHours(start.getHours(), start.getMinutes(), 0)
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
              <ClearButton onPress={clear} />
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
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  }
})