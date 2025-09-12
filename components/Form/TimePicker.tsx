import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SymbolView } from 'expo-symbols'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { startOfDay } from 'date-fns';

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks'

type TimePickerProps = {
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
}

export default function TimePicker({ date, setDate }: TimePickerProps) {
  const theme = useTheme()
  const [active, setActive] = useState<boolean>(false)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate)
  };

  function deactivate() {
    if (date) {
      setDate(startOfDay(new Date(date)))
      setActive(false)
    }
  }

  return (
    <View style={[styles.row]}>
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
              <Text>X</Text>
            </PressableOpacity>
          </View>
          :
          <PressableOpacity onPress={() => setActive(true)}>
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
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
  field: {
    flexDirection: 'row'
  },
})