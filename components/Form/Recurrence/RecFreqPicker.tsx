import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'
import { Frequency } from '@/types'

const frequencies: Frequency[] = ['once', 'daily', 'weekly', 'monthly']

type RecFreqPickerProps = {
  frequency: Frequency
  setFrequency: React.Dispatch<React.SetStateAction<Frequency>>
}

export default function RecFreqPicker({ frequency, setFrequency }: RecFreqPickerProps) {
  const theme = useTheme()
  return (
    <View style={[styles.container, { borderColor: theme.accent }]} >
      {frequencies.map(function (value, index) {
        const text = value.replace(/\w/, c => c.toUpperCase())
        return (
          <PressableOpacity
            key={index}
            style={[styles.item, frequency === value && { backgroundColor: theme.accent }]}
            onPress={() => setFrequency(value)}
          >
            <Text style={[styles.itemText, { color: frequency === value ? theme.primary : theme.accent }]}>{text}</Text>
          </PressableOpacity>
        )
      })}
    </View>
  )
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