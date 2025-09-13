import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Frequency, RRule } from 'rrule'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'

const frequencies: ('once' | 3 | 2 | 1)[] = ['once', RRule.DAILY, RRule.WEEKLY, RRule.MONTHLY]

type RecFreqPickerProps = {
  frequency: Frequency | 'once'
  setFrequency: React.Dispatch<React.SetStateAction<Frequency | 'once'>>
}

export default function RecFreqPicker({ frequency, setFrequency }: RecFreqPickerProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, { borderColor: theme.accent }]} >
      {frequencies.map(function (value, index) {
        return (
          <PressableOpacity
            key={index}
            style={[styles.item, frequency === value && { backgroundColor: theme.accent }]}
            onPress={() => setFrequency(value)}
          >
            <Text style={[styles.itemText, { color: frequency === value ? theme.primary : theme.accent }]}>{text[value]}</Text>
          </PressableOpacity>
        )
      })}
    </View>
  )
}

const text = {
  'once': 'Once',
  3: 'Daily',
  2: 'Weekly',
  1: 'Monthly'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 5,
  },
  item: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    fontWeight: '500',
    fontSize: 16,
  },
})