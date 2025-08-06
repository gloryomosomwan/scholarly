import { Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SymbolView } from 'expo-symbols'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import DateTimeModal from '@/components/Modals/DateTimeModal'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { DueType } from '@/types/types'
import { useTheme } from '@/hooks'

type DateTimePickerProps = {
  placeholder?: string
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
  dueType: DueType | null
  setDueType?: React.Dispatch<React.SetStateAction<DueType | null>>
}

export default function DateTimePicker({ date, setDate, dueType, setDueType, placeholder }: DateTimePickerProps) {
  const theme = useTheme()
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <View>
      <PressableOpacity style={styles.row} onPress={handlePresentModal}>
        <SymbolView name={'calendar'} tintColor={theme.grey500} size={24} />
        {
          !date
            ? <Text style={[styles.text, { color: theme.grey500 }]}>{placeholder ? placeholder : 'Add date'}</Text>
            : <Text style={[styles.text, { color: theme.grey500 }]}>{dueType === 'date' ? date.toLocaleDateString() : date.toLocaleString()}</Text>
        }
      </PressableOpacity>
      <DateTimeModal initialDate={date ? date : new Date()} setDate={setDate} setDueType={setDueType} bottomSheetModalRef={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 0,
  },
})