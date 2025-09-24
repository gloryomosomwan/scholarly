import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SymbolView } from 'expo-symbols'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useAnimatedReaction } from 'react-native-reanimated';
import { startOfDay } from 'date-fns';

import { useTheme } from '@/hooks/useTheme'

import PressableOpacity from '@/components/Buttons/PressableOpacity';

type SemesterDatePickerProps = {

}

export default function SemesterDatePicker({ }: SemesterDatePickerProps) {
  const theme = useTheme()
  const [externalDate, setExternalDate] = useState<Date | null>(null)
  const [internalDate, setInternalDate] = useState(new Date())

  const [showCalendar, setShowCalendar] = useState(false)
  const height = useSharedValue(40)
  const opacity = useSharedValue(0)

  const handlePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) setExternalDate(startOfDay(selectedDate))
  };

  useEffect(() => {
    showCalendar ? height.value = 380 : height.value = 70
    showCalendar ? opacity.value = 1 : opacity.value = 0
  }, [showCalendar])

  const rStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value)
  }))

  const qStyle = useAnimatedStyle(() => ({
    // opacity: withTiming(opacity.value)
    opacity: 1
  }))

  function handlePress() {
    setShowCalendar(!showCalendar)
    !externalDate && setExternalDate(startOfDay(new Date()))
  }

  function clearDate() {
    setShowCalendar(false)
    setExternalDate(null)
  }

  // useAnimatedReaction(
  //   () => {
  //     return opacity.value;
  //   },
  //   (currentValue, previousValue) => {
  //     console.log(currentValue)
  //   }
  // );
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.secondary }, rStyle]}>
      <View style={styles.fieldContainer}>
        <View style={styles.halfFieldContainer}>
          <SymbolView name="calendar" />
          <Text style={[styles.labelText, { color: theme.text }]}>Start Date</Text>
        </View>
        <View style={styles.halfFieldContainer}>
          {/* <Button title='open' onPress={() => setShowCalendar(!showCalendar)} /> */}
          <PressableOpacity style={[styles.button, { backgroundColor: theme.grey200 }]} onPress={handlePress}>
            <Text style={[styles.dateText, { color: theme.text }]}>{externalDate === null ? 'No Date' : externalDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</Text>
          </PressableOpacity>
          {
            externalDate &&
            <PressableOpacity style={[styles.clearButton, { backgroundColor: theme.grey200 }]} onPress={clearDate}>
              <SymbolView name='xmark' size={15} />
            </PressableOpacity>
          }
        </View>
      </View>
      <Animated.View style={[qStyle, styles.pickerContainer]}>
        <DateTimePicker
          testID="dtp"
          value={internalDate}
          mode={'date'}
          display={'inline'}
          onChange={handlePickerChange}
        />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    // paddingTop: 10,
    paddingHorizontal: 40,
    paddingTop: 15,
    borderRadius: 10,
    // alignItems: 'center',
    // backgroundColor: '#03045e'
  },
  fieldContainer: {
    // alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#971ecfff'
  },
  halfFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // backgroundColor: '#00b4d8'
  },
  pickerContainer: {

  },
  labelText: {
    fontSize: 16,
  },
  dateText: {

  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  clearButton: {
    padding: 10,
    borderRadius: 20,
  },
})