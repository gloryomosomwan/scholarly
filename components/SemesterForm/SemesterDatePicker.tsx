import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { startOfDay } from 'date-fns';

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity';

type SemesterDatePickerProps = {
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  label: string
  invalid?: boolean
}

export default function SemesterDatePicker({ date, setDate, label, invalid }: SemesterDatePickerProps) {
  const theme = useTheme()
  const [internalDate, setInternalDate] = useState(date || new Date())

  const [showCalendar, setShowCalendar] = useState(false)
  const height = useSharedValue(70)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) setDate(startOfDay(selectedDate))
  };

  useEffect(() => {
    showCalendar ? height.value = 380 : height.value = 70
  }, [showCalendar])

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value)
  }))

  function handlePress() {
    setShowCalendar(!showCalendar)
    !date && setDate(startOfDay(new Date()))
  }

  function clearDate() {
    setShowCalendar(false)
    setDate(null)
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.secondary }, animatedStyle]}>
      <View style={styles.fieldContainer}>
        <View style={styles.halfFieldContainer}>
          <SymbolView name="calendar" />
          <Text style={[styles.labelText, { color: invalid ? 'red' : theme.text }]}>{label}</Text>
        </View>
        <View style={styles.halfFieldContainer}>
          <PressableOpacity style={[styles.button, { backgroundColor: theme.grey200 }]} onPress={handlePress}>
            <Text style={[styles.dateText, { color: theme.text }]}>{date === null ? 'No Date' : date.toLocaleDateString('en-GB', options)}</Text>
          </PressableOpacity>
          {
            date &&
            <PressableOpacity style={[styles.clearButton, { backgroundColor: theme.grey200 }]} onPress={clearDate}>
              <SymbolView name='xmark' size={15} tintColor={theme.grey400} />
            </PressableOpacity>
          }
        </View>
      </View>
      <View>
        <DateTimePicker
          testID="dtp"
          value={internalDate}
          mode={'date'}
          display={'inline'}
          onChange={handlePickerChange}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingHorizontal: 40,
    paddingTop: 15,
    borderRadius: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labelText: {
    fontSize: 16,
  },
  dateText: {},
  button: {
    padding: 10,
    borderRadius: 8,
  },
  clearButton: {
    padding: 8,
    borderRadius: 20,
  },
})