import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { useTheme } from '@/hooks/useTheme'
import { SymbolView } from 'expo-symbols'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button } from '@rneui/themed';

type SemesterDatePickerProps = {

}

export default function SemesterDatePicker({ }: SemesterDatePickerProps) {
  const theme = useTheme()
  const [date, setDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate)
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <View style={styles.subContainer}>
          <SymbolView name="calendar" />
          <Text>Start Date</Text>
        </View>
        <View style={styles.subContainer}>
          <Button title='open' onPress={() => setShowCalendar(!showCalendar)} />
        </View>
      </View>
      {
        showCalendar &&
        <DateTimePicker
          testID="dtp"
          value={date}
          mode={'date'}
          display={'inline'}
          onChange={handlePickerChange}
        // accentColor={theme.accent}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'grey'
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})