import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { DueType } from '@/types/types'
import { useTheme } from '@/hooks'

type DateTimePickerProps = {
  date: Date | null
  dueType: DueType | null
  handleSetDate: (date: Date, dueType: DueType) => void
}

export default function DateTimePicker({ date, dueType, handleSetDate }: DateTimePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View>
      <PressableOpacity style={styles.detailRow} onPress={handlePresentModalPress}>
        <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
        {
          !date
            ? <Text style={[styles.detailText, { color: theme.grey500 }]}>Add date</Text>
            : <Text style={[styles.detailText, { color: theme.grey500 }]}>{dueType === 'date' ? date.toLocaleDateString() : date.toLocaleString()}</Text>
        }
      </PressableOpacity>
      <DateTimeModal initialDate={new Date()} handleSetDate={handleSetDate} bottomSheetModalRef={modalRef} />
    </View>
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