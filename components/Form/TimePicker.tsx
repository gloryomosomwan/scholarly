import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SymbolView } from 'expo-symbols'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { startOfDay } from 'date-fns';

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'
import { DueType } from '@/types'

type TimePickerProps = {
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  setDueType: React.Dispatch<React.SetStateAction<DueType>>
}

export default function TimePicker({ date, setDate, setDueType }: TimePickerProps) {
  const theme = useTheme()
  const [active, setActive] = useState<boolean>(false)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate)
  };

  function activate() {
    setDueType('datetime')
    setActive(true)
  }

  function deactivate() {
    if (date) {
      setDueType('date')
      setActive(false)
      setDate(startOfDay(new Date(date)))
    }
  }

  return (
    <View style={[styles.row, !active && { gap: 16 }]}>
      <SymbolView name={'clock'} tintColor={theme.grey500} size={24} />
      {
        active && date ?
          <View style={[styles.field]}>
            <DateTimePicker
              testID="timePicker"
              value={date}
              mode={'time'}
              display={'inline'}
              onChange={handlePickerChange}
              accentColor={theme.accent}
            />
            <PressableOpacity onPress={deactivate}>
              <SymbolView name={'x.circle'} tintColor={theme.grey500} size={24} />
            </PressableOpacity>
          </View>
          :
          <PressableOpacity onPress={activate}>
            <Text style={[styles.text, { color: theme.grey500 }]}>Add time</Text>
          </PressableOpacity>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
})