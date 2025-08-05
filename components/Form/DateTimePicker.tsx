import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableOpacity from '@/components/Buttons/PressableOpacity'
import { useTheme } from '@/hooks'
import { SymbolView } from 'expo-symbols'
import { DueType } from '@/types/types'

type DateTimePickerProps = {
  handlePresentModalPress: () => void
  date: Date | null
  dueType: DueType | null
}

export default function DateTimePicker({ handlePresentModalPress, date, dueType }: DateTimePickerProps) {
  const theme = useTheme()
  return (
    <PressableOpacity style={styles.detailRow} onPress={handlePresentModalPress}>
      <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
      {
        !date
          ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add date</Text>
          : <Text style={[styles.detailText, { color: theme.grey500 }]}>{dueType === 'date' ? date.toLocaleDateString() : date.toLocaleString()}</Text>
      }
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  detailText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})